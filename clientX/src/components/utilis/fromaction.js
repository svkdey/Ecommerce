export const validate = (element, formdata=[]) => {
    // console.log(element)
    let error=[true,''];
    if (element.validation.email) {
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const valid = re.test(element.value);
        const msg = `${!valid?"Must be a valid email":''}`;
        error = !valid ? [valid, msg] : error
    }
    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match':''}`;
        error = !valid ? [valid, message] : error;
    }
    if(element.validation.required){
        const valid=element.value.trim()!=='';
        // console.log(valid)
        const msg=`${!valid?"This field is required":''}`;
        error = !valid ? [valid, msg] : error
    }
    // console.log(error)
    return error;
}

export const update=(element, formdata,formName)=>{
    const newFormdata={...formdata};
    // console.log(newFormdata)
    const newElement={
        ...newFormdata[element.id]
    }
    newElement.value=element.event.target.value;
    if(element.blur){
        let validData = validate(newElement,formdata)
         newElement.valid = validData[0];
         newElement.validationMessage=validData[1];

    }
    newElement.touched=element.blur;
    newFormdata[element.id]=newElement;
    // console.log(newFormdata)
    return newFormdata;
}

export const generateData=(formdata,formname)=>{
    let dataTosubmit={};
    for(let key in formdata){
        if (key !== 'confirmPassword'){
            dataTosubmit[key] = formdata[key].value;
        }
        
    }
    return dataTosubmit;
}
export const ifFormisValid = (formdata, formname) => {
    // console.log(formdata)
    let formIsvalid=true;
    for(let key in formdata){

        formIsvalid=formdata[key].valid&&formIsvalid
    }
    return formIsvalid;
}


export const populateOptionField=(formdata, arrayData=[],field)=>{
    const newArray=[];
    const newFormdata={...formdata};
    arrayData.forEach(item=>{
        newArray.push({key:item._id,value:item.name});
    })
    newFormdata[field].config.options=newArray;
    return newFormdata;
}

export const resetFileds = (formdata,formname)=>{
    const newFormdata={...formdata};
    for(let key in newFormdata){
        if(key==='images'){
            newFormdata[key].value=[];

        }else{
            newFormdata[key].value ='';
        }
        newFormdata[key].value='';
        newFormdata[key].valid=false;
        newFormdata[key].touched=false;
        newFormdata[key].validationMessage = '';

    }
    return newFormdata;

}

export const populateFields=(formData,fields)=>{
    // console.log(formData, fields)
    for (let key in formData){
        // console.log(formData[key] ,fields[key])
        formData[key].value=fields[key];
        formData[key].valid=true;
        formData[key].touched = false;
        formData[key].validationMessage = '';
    }
    return formData;
}