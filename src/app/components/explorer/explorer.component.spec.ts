import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExplorerComponent} from './explorer.component';
import {ImageComponent} from "../image/image.component";
import {ExplorerService} from "../../services/explorer.service";
import {StoreModule} from "@ngrx/store";
import {reducer} from "../../shared/reducers";

describe('ExplorerComponent', () => {
    let component: ExplorerComponent;
    let fixture: ComponentFixture<ExplorerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ExplorerComponent,
                ImageComponent
            ],
            imports: [
                StoreModule.provideStore(reducer)
            ],
            providers: [ExplorerService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExplorerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have no current directory`, async(() => {
        const fixture = TestBed.createComponent(ExplorerComponent);
        const explorer = fixture.debugElement.componentInstance;
        expect(explorer.currentDirectory).toBeUndefined();
    }));
});
