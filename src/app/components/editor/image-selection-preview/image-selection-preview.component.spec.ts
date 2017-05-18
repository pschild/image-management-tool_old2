import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageSelectionPreviewComponent} from './image-selection-preview.component';

describe('ImageSelectionPreviewComponent', () => {
    let component: ImageSelectionPreviewComponent;
    let fixture: ComponentFixture<ImageSelectionPreviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImageSelectionPreviewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageSelectionPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
