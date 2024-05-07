import { LightningElement, api, wire } from 'lwc';
import getContactsBornAfter from '@salesforce/apex/ContactController.getContactsBornAfter';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import { reduceErrors } from 'c/ldsUtils';

export default class GetContactsBornAfter extends LightningElement {
    @api minBirthDate;
    @wire(getContactsBornAfter, { birthDate: '$minBirthDate' })
    contacts;

    get name (){
        return getFieldValue(this.contacts.data,CONTACT_NAME_FIELD);

    }

    // In this component we have called the getContactsBornAfter method both with wire and imperatively :
    handleButtonClick() {
        getContactsBornAfter({ //imperative Apex call
            birthDate: this.minBirthDate
        })
            .then(contacts => {
                //code to execute if related contacts are returned successfully
            })
            .catch(error => {
                //code to execute if related contacts are not returned successfully
            });
    }
}