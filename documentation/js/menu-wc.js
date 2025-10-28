'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">scrum documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ActivityModule.html" data-type="entity-link" >ActivityModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' : 'data-bs-target="#xs-controllers-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' :
                                            'id="xs-controllers-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' }>
                                            <li class="link">
                                                <a href="controllers/ActivityController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' : 'data-bs-target="#xs-injectables-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' :
                                        'id="xs-injectables-links-module-ActivityModule-a2e3200427fc2c558ab768b27e95ccf2b54ef8ac73dee3f998a5497a2505cf34c927c83dcfb4b982d086ae9d144bb6a0b4d4ac7aa9cf3b8e8c64152893447f9c"' }>
                                        <li class="link">
                                            <a href="injectables/ActivityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActivityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' :
                                            'id="xs-controllers-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' :
                                        'id="xs-injectables-links-module-AuthModule-d429152a9a5665cd2e49a8c02b74801476a162a613eacfa8825ccf22949f3e148ff75dc87019fb70033414c5959f9c6eeb3b8d9293e1d7a004c06bc2bc6c7c72"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CalendarTaskModule.html" data-type="entity-link" >CalendarTaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' : 'data-bs-target="#xs-controllers-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' :
                                            'id="xs-controllers-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' }>
                                            <li class="link">
                                                <a href="controllers/CalendarController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' : 'data-bs-target="#xs-injectables-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' :
                                        'id="xs-injectables-links-module-CalendarTaskModule-6c5395c7db64b6364fcdec42fe45ac1c32f5be2fbdf5fe0ebea24e179a32633aa36f1ea48e0b156ec835273c02ca78b0634a8c97537ef95cba37f73d5dad01b5"' }>
                                        <li class="link">
                                            <a href="injectables/CalendarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalendarService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColumnModule.html" data-type="entity-link" >ColumnModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' : 'data-bs-target="#xs-controllers-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' :
                                            'id="xs-controllers-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' }>
                                            <li class="link">
                                                <a href="controllers/ColumnController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' : 'data-bs-target="#xs-injectables-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' :
                                        'id="xs-injectables-links-module-ColumnModule-5f9956f5fbf98ebf3341931dc74d2bb3da0bd122abad936b766d0f4c06ba3ae28aa06cde14fdb95763278054e5a5545ea98dcc9e26a1e5e2896a762434d2cc8c"' }>
                                        <li class="link">
                                            <a href="injectables/ColumnService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColumnModule.html" data-type="entity-link" >ColumnModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' : 'data-bs-target="#xs-controllers-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' :
                                            'id="xs-controllers-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' }>
                                            <li class="link">
                                                <a href="controllers/ColumnController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' : 'data-bs-target="#xs-injectables-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' :
                                        'id="xs-injectables-links-module-ColumnModule-0524e179c0e0314805d479a7ce1da93872689259aea1c89d2a00296ac3c6e5da98d5a0377004791c0034c4922f43cb28727f5749e6ca006d60ef17687f6c5613-1"' }>
                                        <li class="link">
                                            <a href="injectables/ColumnService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColumnService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentModule.html" data-type="entity-link" >CommentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' : 'data-bs-target="#xs-controllers-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' :
                                            'id="xs-controllers-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' }>
                                            <li class="link">
                                                <a href="controllers/CommentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' : 'data-bs-target="#xs-injectables-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' :
                                        'id="xs-injectables-links-module-CommentModule-65b9079bccc7e07c194021f86dbd9202fe86865a3b9e15c3c18737dd2b283e78d4d2698324bdc2482d9ec458f997f8e84d9e2a6314f4d777668ed50c2e826699"' }>
                                        <li class="link">
                                            <a href="injectables/CommentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommitmentsModule.html" data-type="entity-link" >CommitmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' : 'data-bs-target="#xs-controllers-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' :
                                            'id="xs-controllers-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' }>
                                            <li class="link">
                                                <a href="controllers/CommitmentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommitmentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' : 'data-bs-target="#xs-injectables-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' :
                                        'id="xs-injectables-links-module-CommitmentsModule-5b33b534ebcd4b3bfb57cde4f4f5e0199eabbfff492d0b221961ef1fba9bbf7aa36ea399a5c7e1ee00c1e31f60c869617c79fab9bd4b725b6d64e34445706730"' }>
                                        <li class="link">
                                            <a href="injectables/CommitmentsCron.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommitmentsCron</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommitmentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommitmentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' : 'data-bs-target="#xs-controllers-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' :
                                            'id="xs-controllers-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' }>
                                            <li class="link">
                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' : 'data-bs-target="#xs-injectables-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' :
                                        'id="xs-injectables-links-module-DashboardModule-b34c8bf2e7e6c13d49bee81e06ffc284e5037a889c7c3691ce8353eab5ad825583641f42a91d661d551b74a8f8cd0692b43b14d1b9c6c48d26a0293a5cb6cad3"' }>
                                        <li class="link">
                                            <a href="injectables/DashboardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link" >NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' : 'data-bs-target="#xs-controllers-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' :
                                            'id="xs-controllers-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' : 'data-bs-target="#xs-injectables-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' :
                                        'id="xs-injectables-links-module-NotificationModule-25636e7fc9c734fd2d12c730f4298de7b4626a80159639add1e9fe6ea6ed1a8b673dd2145c6f34644a10c59147a10988713636e14e597115eea1cb8218836583"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationCleanup.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationCleanup</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' : 'data-bs-target="#xs-controllers-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' :
                                            'id="xs-controllers-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' }>
                                            <li class="link">
                                                <a href="controllers/ProjectController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' : 'data-bs-target="#xs-injectables-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' :
                                        'id="xs-injectables-links-module-ProjectModule-3025d399ee0bfab13588b0835d48dff6b50065263c18ff10220a133316c26ac93bf8bb8bc907fd8c2046de3901925fab35d87b2f51fd7b500edf2f812168047a"' }>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubtaskModule.html" data-type="entity-link" >SubtaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' : 'data-bs-target="#xs-controllers-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' :
                                            'id="xs-controllers-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' }>
                                            <li class="link">
                                                <a href="controllers/SubtaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubtaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' : 'data-bs-target="#xs-injectables-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' :
                                        'id="xs-injectables-links-module-SubtaskModule-929efe0e6d5b4b232bdfb7b1f8739cf5f647101f6de076be9f2140250e522a850e132a26d20fc41d82bf4b9fc309c3274b48d51c1e3d2bea4ba0cd63871e3a76"' }>
                                        <li class="link">
                                            <a href="injectables/SubtaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubtaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' : 'data-bs-target="#xs-controllers-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' :
                                            'id="xs-controllers-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' : 'data-bs-target="#xs-injectables-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' :
                                        'id="xs-injectables-links-module-TaskModule-61689c09e8e0688d739632a497de2cabea2e6f3ab8c1235281f84ad333061f20aed7a5ab830983cf8d2ddd332949c921947b7121c759790db1305fb5e11bc332"' }>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamsModule.html" data-type="entity-link" >TeamsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' : 'data-bs-target="#xs-controllers-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' :
                                            'id="xs-controllers-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' }>
                                            <li class="link">
                                                <a href="controllers/TeamsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' : 'data-bs-target="#xs-injectables-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' :
                                        'id="xs-injectables-links-module-TeamsModule-6a7b2a58d9e0ffc76f4084356baa8b2e5d70d9b02bb85946f30f8455619a217fab10672e0915b291d82125b74e597452f6e8dfe27b0275df6c302cc743476bfc"' }>
                                        <li class="link">
                                            <a href="injectables/TeamsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeamsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' : 'data-bs-target="#xs-controllers-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' :
                                            'id="xs-controllers-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' : 'data-bs-target="#xs-injectables-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' :
                                        'id="xs-injectables-links-module-UserModule-0c26f425ed66d766c8496574797603fe353b0538744c69ba3244ad54a9288665cc54f0f8467ae49fc37115e2ce28c24ab45a05b7bb56e1d27d9e65e0685c5a15"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' :
                                            'id="xs-controllers-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' :
                                        'id="xs-injectables-links-module-UsersModule-f0c23466bb1749ca648851da6c55c044d11be3d2208d82f760dd04a7b4f62081f7246c903023aa3c370de7abad3e5f71484cedbb527e457db6374f0ccf728465"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkspaceModule.html" data-type="entity-link" >WorkspaceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' : 'data-bs-target="#xs-controllers-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' :
                                            'id="xs-controllers-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' }>
                                            <li class="link">
                                                <a href="controllers/WorkspaceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkspaceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' : 'data-bs-target="#xs-injectables-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' :
                                        'id="xs-injectables-links-module-WorkspaceModule-c6e308f87b955e6fa4ffd1e9a424a4d8bc82a3b98acf6cf28707abea2b286a2dffadb005f2f0d89ef2a3a8a4325058b21bf746d41c73b787a11ce031910bcdda"' }>
                                        <li class="link">
                                            <a href="injectables/WorkspaceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkspaceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/ActivityController.html" data-type="entity-link" >ActivityController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CalendarController.html" data-type="entity-link" >CalendarController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ColumnController.html" data-type="entity-link" >ColumnController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ColumnController-1.html" data-type="entity-link" >ColumnController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CommentController.html" data-type="entity-link" >CommentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CommitmentsController.html" data-type="entity-link" >CommitmentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DashboardController.html" data-type="entity-link" >DashboardController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotificationController.html" data-type="entity-link" >NotificationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProjectController.html" data-type="entity-link" >ProjectController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubtaskController.html" data-type="entity-link" >SubtaskController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TaskController.html" data-type="entity-link" >TaskController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TeamsController.html" data-type="entity-link" >TeamsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/WorkspaceController.html" data-type="entity-link" >WorkspaceController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Activity.html" data-type="entity-link" >Activity</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddMemberDto.html" data-type="entity-link" >AddMemberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddMemberDto-1.html" data-type="entity-link" >AddMemberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarModule.html" data-type="entity-link" >CalendarModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarTask.html" data-type="entity-link" >CalendarTask</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarTask-1.html" data-type="entity-link" >CalendarTask</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarUser.html" data-type="entity-link" >CalendarUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarWorkspace.html" data-type="entity-link" >CalendarWorkspace</a>
                            </li>
                            <li class="link">
                                <a href="classes/Column.html" data-type="entity-link" >Column</a>
                            </li>
                            <li class="link">
                                <a href="classes/Column-1.html" data-type="entity-link" >Column</a>
                            </li>
                            <li class="link">
                                <a href="classes/Column-2.html" data-type="entity-link" >Column</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnGateway.html" data-type="entity-link" >ColumnGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColumnGateway-1.html" data-type="entity-link" >ColumnGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentGateway.html" data-type="entity-link" >CommentGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Commitment.html" data-type="entity-link" >Commitment</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommitmentsGateway.html" data-type="entity-link" >CommitmentsGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateActivityDto.html" data-type="entity-link" >CreateActivityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommitmentDto.html" data-type="entity-link" >CreateCommitmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMeetingDto.html" data-type="entity-link" >CreateMeetingDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNotificationDto.html" data-type="entity-link" >CreateNotificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubtaskDto.html" data-type="entity-link" >CreateSubtaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto-1.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWorkspaceDto.html" data-type="entity-link" >CreateWorkspaceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DashboardMetricsDto.html" data-type="entity-link" >DashboardMetricsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventsGateway.html" data-type="entity-link" >EventsGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForgotPasswordDto.html" data-type="entity-link" >ForgotPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MarkReadDto.html" data-type="entity-link" >MarkReadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Meeting.html" data-type="entity-link" >Meeting</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeetingResponseDto.html" data-type="entity-link" >MeetingResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Member.html" data-type="entity-link" >Member</a>
                            </li>
                            <li class="link">
                                <a href="classes/Member-1.html" data-type="entity-link" >Member</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link" >Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto-1.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResendVerificationDto.html" data-type="entity-link" >ResendVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link" >ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subtask.html" data-type="entity-link" >Subtask</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubtaskGateway.html" data-type="entity-link" >SubtaskGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task-1.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskGateway.html" data-type="entity-link" >TaskGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskGateway-1.html" data-type="entity-link" >TaskGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Team.html" data-type="entity-link" >Team</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateActivityDto.html" data-type="entity-link" >UpdateActivityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCommentDto.html" data-type="entity-link" >UpdateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCommitmentDto.html" data-type="entity-link" >UpdateCommitmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubtaskDto.html" data-type="entity-link" >UpdateSubtaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/Workspace.html" data-type="entity-link" >Workspace</a>
                            </li>
                            <li class="link">
                                <a href="classes/Workspace-1.html" data-type="entity-link" >Workspace</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkspaceGateway.html" data-type="entity-link" >WorkspaceGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkspaceSubtask.html" data-type="entity-link" >WorkspaceSubtask</a>
                            </li>
                            <li class="link">
                                <a href="classes/WorkspaceTask.html" data-type="entity-link" >WorkspaceTask</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActivityService.html" data-type="entity-link" >ActivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarService.html" data-type="entity-link" >CalendarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColumnService.html" data-type="entity-link" >ColumnService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ColumnService-1.html" data-type="entity-link" >ColumnService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link" >CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommitmentsCron.html" data-type="entity-link" >CommitmentsCron</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommitmentsService.html" data-type="entity-link" >CommitmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardService.html" data-type="entity-link" >DashboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HbsRenderService.html" data-type="entity-link" >HbsRenderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationCleanup.html" data-type="entity-link" >NotificationCleanup</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectService.html" data-type="entity-link" >ProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubtaskService.html" data-type="entity-link" >SubtaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamsService.html" data-type="entity-link" >TeamsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TemplateEditorService.html" data-type="entity-link" >TemplateEditorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService-1.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkspaceService.html" data-type="entity-link" >WorkspaceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZipExportService.html" data-type="entity-link" >ZipExportService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ApiKeyGuard.html" data-type="entity-link" >ApiKeyGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthenticatedRequest.html" data-type="entity-link" >AuthenticatedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticatedUser.html" data-type="entity-link" >AuthenticatedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommitmentQuery.html" data-type="entity-link" >CommitmentQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload-1.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocalAuthenticatedRequest.html" data-type="entity-link" >LocalAuthenticatedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationResponse.html" data-type="entity-link" >NotificationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});