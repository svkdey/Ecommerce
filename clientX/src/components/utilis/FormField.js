import React from 'react';

const FormField = ({formdata, change, id}) => {


    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }


    const renderTemplate = () => {
        let formTemplate = null;
        // console.log(formdata)
        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel?<div>
                            {formdata.config.lable}
                    </div>:null}
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        />
                        {showError()}
                    </div>
                )
            break;
            case ('textarea'):
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ? <div>
                            {formdata.config.lable}
                        </div> : null}
                       <textarea
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                       />
                        {showError()}
                    </div>
                )
                break;
                case('select'):
                // console.log(formdata)
                formTemplate = (
                    <div className="formBlock">
                        {formdata.showlabel ? 
                            <div>{formdata.config.lable}</div>
                        :null}
                        <select
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option 
                                        key={item.key} 
                                        value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
                    break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }


    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;