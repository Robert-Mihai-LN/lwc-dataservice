import { LightningElement} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
export default class LdsCreateRecord extends LightningElement {
    // the wire adapter is good for reading data from apex 
    handleButtonClick() {
        // but if we want to update,create or delete records we need to use LDS (lightning data service) functions
        
        // this is the config ,basically objectApiName is the API name of our object in the database
        // you can check in Object Manager > Account > API Name
        // fieldApiName is the API name for standard and custom fields 
        const recordInput = {
            apiName: ACCOUNT_OBJECT.objectApiName,
            fields: {
                [ACCOUNT_NAME_FIELD.fieldApiName] : 'ACME'
            }
        };
        // then we pass this configuration  to createRecord
        createRecord(recordInput)
            .then(account => {
                // code to execute if create operation is successful
            })
            .catch(error => {
                // code to execute if create operation is not successful
            });
    }
}