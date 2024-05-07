import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// reference to account name field 
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class LdsWire extends LightningElement {
    /* THE LOGIC HERE IS THE FOLLOWING 
       1 - You access a record page
       2 - the id of the record you selected ( Say Dickenson mobile) will get passed to this component 
       3 -  then this id will get passed in the  options object to our wire  
       4 - basically getRecord will get as parameter an object with recordId coming from the record we accessed 
       5  - and the fields that we requested from schema 
    */
    @api accountRecordId;
    // @wire(adapterFunction,options) name; 
    // E.g  @wire(getRecord,{recordId:'$recordId',fields:[ACCOUNT_NAME_FIELD]}) contact
    @wire(getRecord,{recordId:'$accountRecordId',fields:[ACCOUNT_NAME_FIELD]})
    selectedAccount;
    get name(){
        // returning the name field value
        return getFieldValue(this.selectedAccount.data,ACCOUNT_NAME_FIELD);
    }
}
