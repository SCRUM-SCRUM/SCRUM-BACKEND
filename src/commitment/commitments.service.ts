/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Commitment, CommitmentStatus } from './commitments.schema';
import { CreateCommitmentDto } from './dto/create-commitment.dto';
import { UpdateCommitmentDto } from './dto/update-commitment.dto';
import { CommitmentsGateway } from './commitments.gateway';

@Injectable()
export class CommitmentsService {
  constructor(
    @InjectModel(Commitment.name)
    private readonly commitmentModel: Model<Commitment>,
    private readonly gateway: CommitmentsGateway,
  ) {}

  // Create
  async create(dto: CreateCommitmentDto): Promise<Commitment> {
    const commitment = new this.commitmentModel({
      title: dto.title,
      description: dto.description ?? null,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      assigneeId: dto.assigneeId ?? null,
      linkedTaskId: dto.linkedTaskId ?? null,
      priority: dto.priority ?? 'Medium',
      status: dto.status ?? CommitmentStatus.NOT_STARTED,
      archived: false,
      completed: false,
    });

    const saved = await commitment.save();
    this.gateway.broadcast('commitment.created', saved);
    return saved;
  }

  // Find One
  async findOne(id: string): Promise<Commitment> {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid commitment ID format');
    }
    
    const item = await this.commitmentModel.findById(id).exec();
    if (!item) throw new NotFoundException('Commitment not found');
    return item;
  }

  // List / Filter
  async list(params: {
    tab?: 'All' | 'Upcoming' | 'Due Today' | 'Completed' | 'Archived';
    assigneeId?: string;
    q?: string;
    priority?: string;
    sort?: 'dueDate' | 'assignee' | 'updatedAt';
  } = {}) {
    const filter: Record<string, any> = {};
    const now = new Date();

    // Text search
    if (params.q) filter.title = { $regex: params.q, $options: 'i' };

    // Assignee
    if (params.assigneeId) filter.assigneeId = params.assigneeId;

    // Priority
    if (params.priority) filter.priority = params.priority;

    // Tabs
    if (params.tab && params.tab !== 'All') {
      if (params.tab === 'Upcoming') {
        filter.dueDate = { $gt: now };
        filter.archived = false;
      } else if (params.tab === 'Due Today') {
        const start = new Date(now);
        start.setHours(0, 0, 0, 0);
        const end = new Date(now);
        end.setHours(23, 59, 59, 999);
        filter.dueDate = { $gte: start, $lte: end };
        filter.archived = false;
      } else if (params.tab === 'Completed') {
        filter.status = CommitmentStatus.COMPLETED;
        filter.archived = false;
      } else if (params.tab === 'Archived') {
        filter.archived = true;
      }
    }

    // Sorting
    const sort: Record<string, 1 | -1> = {};
    if (params.sort === 'dueDate') sort.dueDate = 1;
    else if (params.sort === 'assignee') sort.assigneeId = 1;
    else sort.updatedAt = -1;

    return this.commitmentModel.find(filter).sort(sort).exec();
  }

  // Update
  async update(id: string, dto: UpdateCommitmentDto): Promise<Commitment> {
    const item = await this.findOne(id);

    if (dto.title !== undefined) item.title = dto.title;
    if (dto.description !== undefined) item.description = dto.description;
    if (dto.dueDate !== undefined) item.dueDate = new Date(dto.dueDate);
    if (dto.assigneeId !== undefined) item.assigneeId = dto.assigneeId ?? null;
    if (dto.linkedTaskId !== undefined) item.linkedTaskId = dto.linkedTaskId ?? null;
    if (dto.priority !== undefined) item.priority = dto.priority;
    if (dto.status !== undefined) item.status = dto.status;
    if (item.status === CommitmentStatus.COMPLETED) item.completed = true;
    if (dto.archived !== undefined) item.archived = dto.archived;

    const saved = await item.save();
    this.gateway.broadcast('commitment.updated', saved);
    return saved;
  }

  // Mark Complete
  async markComplete(id: string): Promise<Commitment> {
    const item = await this.findOne(id);
    if (item.status === CommitmentStatus.COMPLETED) return item;

    item.status = CommitmentStatus.COMPLETED;
    item.completed = true;

    const saved = await item.save();
    this.gateway.broadcast('commitment.completed', saved);
    return saved;
  }

  // Archive
  async archive(id: string): Promise<Commitment> {
    const item = await this.findOne(id);
    if (!item.archived) {
      item.archived = true;
      const saved = await item.save();
      this.gateway.broadcast('commitment.archived', saved);
      return saved;
    }
    return item;
  }

  // Restore from Archive
  async restore(id: string): Promise<Commitment> {
    const item = await this.findOne(id);
    if (item.archived) {
      item.archived = false;
      const saved = await item.save();
      this.gateway.broadcast('commitment.restored', saved);
      return saved;
    }
    return item;
  }

  // Delete
  async remove(id: string) {
    const item = await this.findOne(id);
    await this.commitmentModel.deleteOne({ _id: item._id }).exec();
    this.gateway.broadcast('commitment.deleted', id);
    return { success: true };
  }

  // Archive Old Completed (24 hrs)
  async archiveOldCompleted() {
    const boundary = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const old = await this.commitmentModel.find({
      status: CommitmentStatus.COMPLETED,
      updatedAt: { $lte: boundary },
    });

    for (const it of old) {
      it.archived = true;
      await it.save();
      this.gateway.broadcast('commitment.archived', it);
    }

    return { archived: old.length };
  }
}