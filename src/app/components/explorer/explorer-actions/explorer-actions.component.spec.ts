import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExplorerActionsComponent} from './explorer-actions.component';

describe('ExplorerActionsComponent', () => {
    let component: ExplorerActionsComponent;
    let fixture: ComponentFixture<ExplorerActionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExplorerActionsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExplorerActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
