import React, { Component } from 'react';
import UserLayout from '../../HOC/User';
import FormField from '../../utilis/FormField';
import {
    update,
    generateData,
    ifFormisValid, populateOptionField, resetFileds
} from '../../utilis/fromaction';
import FileUpload from '../../utilis/FileUpload';
import  {connect} from 'react-redux';
import {getWoods,getBrands,addProduct,clearProduct} from '../../../actions/product_action'
class AddProduct extends Component {
    state={
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config: {
                    lable:'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter Product name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel:true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    lable: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    lable: 'Price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    lable: 'Brand',
                    name: 'brand_input',
                   options:[]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    lable: 'Shipping',
                    name: 'shipping_input',
                    options: [{
                        key:true,value:'Yes'
                        },
                        {
                            key: false, value: 'No'
                        }]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    lable: 'Available in Stock',
                    name: 'available_input',
                    options: [{
                        key: true, value: 'Yes'
                    },
                    {
                        key: false, value: 'No'
                    }]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    lable: 'Wood',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    lable: 'Frets',
                    name: 'frets_input',
                    options: [
                        {
                            key: 20, value: 20
                        },
                        {
                            key: 21, value: 21
                        },
                        {
                            key: 22, value: 22
                        },
                        {
                            key: 24, value: 24
                        }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    lable: 'Publish',
                    name: 'publish_input',
                    options: [{
                        key: true, value: 'Public'
                    },
                        {
                            key: false, value: 'Private'
                        }]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false
            }
        }
    }
    updateFields = (newFormdata)=>{
        // console.log(
        //     newFormdata
        // )
        this.setState({
            formdata:newFormdata
        })
    }
    componentWillMount(){
        const formdata=this.state.formdata;
        this.props.dispatch(getBrands())
                    .then(res=>{
                        const newFormdata = populateOptionField(formdata,this.props.products.brands,'brand');
                        this.updateFields(newFormdata)
                    
                    })
        this.props.dispatch(getWoods())
            .then(res => {
                const newFormdata = populateOptionField(formdata, this.props.products.woods, 'wood');
                this.updateFields(newFormdata)

            })
    }
    imagesHandler=(images)=>{
        console.log(images)
        const newFormData={...this.state.formdata}
        newFormData['images'].value=images;
        newFormData['images'].valid = true;

        this.setState({
            formdata: newFormData
        })
    } 
    updateForm = (element) => {
        // console.log(element)
        const newFormdata = update(element, this.state.formdata, 'products');
        // console.log(newFormdata)
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    resetFieldHandler=()=>{
        const newFormData = resetFileds(this.state.formdata, 'products');

        this.setState({
            formSuccess:true,
            formdata: newFormData
        })
        setTimeout(()=>{
            this.setState({
                formSuccess:false
            },()=>{
                this.props.dispatch(clearProduct())
            })
        },2000)
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let dataTosubmit = generateData(this.state.formdata, 'products');
        let formIsValid = ifFormisValid(this.state.formdata, 'products')
        // console.log(formIsValid)
        if (formIsValid) {
            console.log(dataTosubmit)
           this.props.dispatch(addProduct(dataTosubmit))
                    .then(()=>{
                        if(this.props.products.addProduct.success){
                            this.resetFieldHandler();
                        }
                        else{
                            this.setState({formError:true})
                        }
                    })
        } else {
            this.setState({
                formError: true,
            })
        }
    }
    render() {
        return (
            <UserLayout>
                <div>
                   <h1>Add Products</h1>
                    <form onSubmit={(e) => { this.handleFormSubmit(e)}}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="from_devider">
                            <FormField
                                id={'brand'}
                                formdata={this.state.formdata.brand}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'shipping'}
                                formdata={this.state.formdata.shipping}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="from_devider">
                            <FormField
                                id={'wood'}
                                formdata={this.state.formdata.wood}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'frets'}
                                formdata={this.state.formdata.frets}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="from_devider">
                            <FormField
                                id={'publish'}
                                formdata={this.state.formdata.publish}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'available'}
                                formdata={this.state.formdata.available}
                                change={(element) => this.updateForm(element)}
                            />
                            
                        </div>
                        {this.state.formSuccess?
                        <div className="form_success">
                             Success..
                        </div>:null}

                        {
                            this.state.formError ?
                                <div className="error_label">
                                    please check your data
                        </div>
                                : null}
                        <button onClick={(e) => this.handleFormSubmit(e)}> Add Product</button>
                   </form>
            </div>
            </UserLayout>
            
        )
    }
}
const mapStateToProps = (state) => { 
    // console.log(state)
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(AddProduct);
