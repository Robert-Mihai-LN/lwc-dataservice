import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
export default class WireGetRecord extends LightningElement {
    /*
    Initial Data Load: When the component initially loads, the wire adapter retrieves the data from the server,
     and the wired function is called with the initial data.
     Subsequent Data Updates: If the data in the Salesforce record changes (e.g., the account name is updated), 
     the wire adapter re-fetches the data from the server. When the new data is available, the wired function is calle
     d again with the updated data.
    */

    @api recordId;
    data;
    error;
    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    // remember the @wire decorator syntax is 
    // @wire(adapterId,configuration) propertyOrMethod
    // so basically here we used wire with a method instead of a property 
    // wiredAccount is a method we created 
    // it retrieves as arguments the data from account (The account name) 
    wiredAccount({data, error}) {
        console.log('Execute logic each time a new value is provisioned');
        if (data) {
            // if there's data  then assign the data we found to this.data (remember we declared it above,after @api recordId)
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
    get name() {
        // so here we return the data 
        return getFieldValue(this.data, ACCOUNT_NAME_FIELD);
    }
}