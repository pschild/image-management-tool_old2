import * as _ from 'lodash';
import {Injectable} from "@angular/core";

@Injectable()
export class CommonValuesHelper {

    getCommonValues(initialValues: Object, images: any[]) {
        if (images.length === 0) {
            return initialValues;
        }

        if (images.length === 1) {
            let mergedValues = Object.assign({}, initialValues, images[0]);
            delete mergedValues.id;
            delete mergedValues.path;
            delete mergedValues.name;
            return mergedValues;
        }

        let commonValues = {};
        Object.keys(initialValues).forEach((key) => {
            // use the first item as reference for comparisons
            let firstValue = images[0][key];
            let differenceFound = false;

            for (let i = 1; i < images.length; i++) {
                let image = images[i];
                // array attributes (tags, persons, ...)
                if (Array.isArray(firstValue)) {
                    firstValue = _.intersectionBy(firstValue, image[key], 'id');
                // all other attributes (strings, numbers, ...)
                } else {
                    if (image[key] !== firstValue) {
                        differenceFound = true;
                        break;
                    }
                }
            }

            if (!differenceFound) {
                commonValues[key] = firstValue;
            }
        });

        return Object.assign({}, initialValues, commonValues);
    }
}
