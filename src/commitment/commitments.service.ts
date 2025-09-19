import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, Between, LessThanOrEqual, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Commitment, CommitmentStatus } from './commitments.entity';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from './dto/update-commitment.dto';
import { CommitmentsGateway } from './commitments.gateway';

@Injectable()
export class CommitmentsService {
  constructor(
    @InjectRepository(Commitment)
    private readonly repo: Repository<Commitment>,
    private readonly gateway: CommitmentsGateway,
  ) {}


  // Removed duplicate archiveOldCompleted method

  async create(dto: CreateCommitmentDto): Promise<Commitment> {
  const commitment = this.repo.create({
    title: dto.title,
    dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    assigneeId: dto.assigneeId !== undefined ? dto.assigneeId : undefined,
    linkedTaskId: dto.linkedTaskId !== undefined ? dto.linkedTaskId : undefined,
    priority: dto.priority ?? 'Medium',
    status: dto.status ?? CommitmentStatus.NOT_STARTED,
    archived: false,


  });

  const saved = await this.repo.save(commitment);
  await this.gateway.broadcast('commitment.created', saved);
  return saved;
}

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Commitment not found');
    return item;
  }
    async list(params: {
    tab?: 'All' | 'Upcoming' | 'Due Today' | 'Completed' | 'Archived';
    assigneeId?: string;
    q?: string;
    priority?: string;
    sort?: 'dueDate' | 'assignee' | 'updatedAt';
  } = {}) {
    const qb = this.repo.createQueryBuilder('c');

    // Text search
    if (params.q) qb.andWhere('c.title ILIKE :q', { q: `%${params.q}%` });

    // Assignee
    if (params.assigneeId) qb.andWhere('c.assigneeId = :assigneeId', { assigneeId: params.assigneeId });

    // Priority
    if (params.priority) qb.andWhere('c.priority = :priority', { priority: params.priority });

    // Tabs logic
    const now = new Date();
    if (!params.tab || params.tab === 'All') {
      // All: show everything (optionally exclude archived if you prefer); we'll show archived only when tab=Archived
    } else if (params.tab === 'Upcoming') {
      // Future due dates (strictly greater than now) and not archived
      qb.andWhere('c.dueDate > :now', { now }).andWhere('c.archived = false');
    } else if (params.tab === 'Due Today') {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      qb.andWhere('c.dueDate BETWEEN :start AND :end', { start, end }).andWhere('c.archived = false');
    } else if (params.tab === 'Completed') {
      qb.andWhere('c.status = :status', { status: CommitmentStatus.COMPLETED }).andWhere('c.archived = false');
    } else if (params.tab === 'Archived') {
      qb.andWhere('c.archived = true');
    }

    // Sorting
    if (params.sort === 'dueDate') qb.orderBy('c.dueDate', 'ASC');
    else if (params.sort === 'assignee') qb.orderBy('c.assigneeId', 'ASC');
    else qb.orderBy('c.updatedAt', 'DESC');

    return qb.getMany();
  }

  async update(id: string, dto: UpdateCommitmentDto) {
    const item = await this.findOne(id);
    if (dto.title !== undefined) item.title = dto.title;
    if (dto.dueDate !== undefined) item.dueDate = new Date(dto.dueDate);
    if (dto.assigneeId !== undefined) item.assigneeId = dto.assigneeId ?? null;
    if (dto.linkedTaskId !== undefined) item.linkedTaskId = dto.linkedTaskId ?? null;
    if (dto.priority !== undefined) item.priority = dto.priority;
    if (dto.status !== undefined) item.status = dto.status;
    if (item.status === CommitmentStatus.COMPLETED) item.completed = true;
     if (dto.archived !== undefined) item.archived = dto.archived;
    const saved = await this.repo.save(item);
    this.gateway.broadcast('commitment.updated', saved);
    return saved;
  }

  async markComplete(id: string) {
    const item = await this.findOne(id);
    if (item.status === CommitmentStatus.COMPLETED) return item;
    item.status = CommitmentStatus.COMPLETED;
    const saved = await this.repo.save(item);
    this.gateway.broadcast('commitment.completed', saved);
    return saved;
  }

  async archive(id: string) {
    const item = await this.findOne(id);
    if (!item.archived) {
      item.archived = true;
      const saved = await this.repo.save(item);
      this.gateway.broadcast('commitment.archived', saved);
      return saved;
    }
    return item;
  }


  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    this.gateway.broadcast('commitment.deleted', { id });
    return { success: true };
  }

  async archiveOldCompleted() {
    const boundary = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const old = await this.repo.find({
      where: {
        status: CommitmentStatus.COMPLETED,
        updatedAt: LessThanOrEqual(boundary) as any,
      } as any,
    });

    for (const it of old) {
      it.archived = true;
      await this.repo.save(it);
      this.gateway.broadcast('commitment.archived', it);
    }

    return { archived: old.length };
  }


}