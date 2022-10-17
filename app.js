// get product elements
const product_form = document.getElementById('product_form');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');
const single_view = document.querySelector('.single-view');

// get category elements
const category_form = document.getElementById('category_form');
const category_list = document.getElementById('category_list');
const category_update_form = document.getElementById('category_update_form');

// get tag elements
const tag_form = document.getElementById('tag_form');
const tag_list = document.getElementById('tag_list');
const tag_update_form = document.getElementById('tag_update_form');





/**
 * get all products
 */
const getAllProduct = () => {

    try {

        axios.get('http://localhost:5050/api/v1/product')
        .then( res => {
            
            let list = '';

            res.data.reverse().forEach((item, index) => {
                list += `
                    <tr class="align-middle">
                        <td>${ index + 1 }</td>  
                        <td>${ item.name }</td>    
                        <td>${ item.regular_price } BDT</td>    
                        <td>${ item.sale_price } BDT</td>    
                        <td><span class="badge bg-success">${ item.status }</span></td>     
                        <td><img style="width:40px; height:40px; object-fit:cover" src="http://127.0.0.1:5050/images/product/${ item.photo }"></td>
                        <td class="d-flex g-3">
                            <a href="#single_product" data-bs-toggle="modal" single_view="${item.id}" class=" btn-sm btn-info me-1"><i class="fas fa-eye"></i></a>
                            <a href="#edit_product" data-bs-toggle="modal" single_view="${item.id}" class="btn btn-sm btn-warning me-1"><i class="fas fa-edit"></i></a>
                            <a href="" class="btn btn-sm btn-danger delete-btn" single_view="${item.id}"><i class="fas fa-trash"></i></a>
                        </td>
                       
                    </tr>
                `
            });

            if(product_list){
                product_list.innerHTML = list;
            }
            
        })
        .catch(error => console.log(error.message))
        
    } catch (error) {
        console.log(error.message);
    }

}

getAllProduct();



/**
 * create a new product
 * submit product form
 */
if(product_form){
    product_form.onsubmit = (e) => {

        try {
    
            e.preventDefault();
            // get form data
            const form_data = new FormData(e.target);
            
    
            axios.post('http://localhost:5050/api/v1/product', form_data)
            .then( res => {
                e.target.reset();
                getAllProduct();
            })
            .catch( error => console.log(error.message));
            
        } catch (error) {
            console.log(error.message);
        }
    
    
    }
}





/**
 * view, edit , delete single product
 */
if(product_list){
    product_list.onclick = (e) => {

        e.preventDefault();
    
        // get single ID
        const singleProduct = e.target.parentElement.getAttribute('single_view')
        console.log(singleProduct);
    
        // single product show
        if(e.target.classList.contains('fa-eye')){
    
            try {
                
                axios.get(`http://localhost:5050/api/v1/product/${singleProduct}`)
                .then( res => {
                    
                    const data = `
                    <div class="row ">
                        <div class="col-md-6">
                            <img class="w-100" src="http://127.0.0.1:5050/images/product/${ res.data.photo }" alt="">
                        </div>
                        <div class="col-md-6 my-3 single-view">
                            <div class="product-title">
                                <h2>${ res.data.name }</h2>
                            </div>
                            <hr>
                            <div class="price d-flex">
                                <h6 class="me-2 fw-bold">Regular Price :</h6>
                                <p class="price">${ res.data.regular_price } BDT</p>
                            </div>
                            <div class="price d-flex">
                                <h6 class="me-2 fw-bold">Sale Price :</h6>
                                <p class="price">${ res.data.sale_price } BDT</p>
                            </div>
                            <div class="price d-flex">
                                <h6 class="me-2 fw-bold">Stock :</h6>
                                <p class="price">${ res.data.stock }</p>
                            </div>
                            <div class="price d-flex">
                                <h6 class="me-2 fw-bold">Category :</h6>
                                <p class="price">${ res.data.category }</p>
                            </div>
                            <div class="price d-flex">
                                <h6 class="me-2 fw-bold">Tag :</h6>
                                <p class="price">${ res.data.tag }</p>
                            </div>
                            <div class="price d-flex">
                                <h6 class="me-2 fw-bold">Status :</h6>
                                <p class="price">${ res.data.status }</p>
                            </div>
                            <div class="price">
                                <h6 class="me-2 fw-bold">Description :</h6>
                                <p class="price">${ res.data.description }</p>
                            </div>
                            <div class="cart">
                                <a class="btn btn-lg btn-dark" href="">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    `;
    
                    if(single_view){
                        single_view.innerHTML = data;
                    }
                
                })
                .catch( err => console.log(err.message));
    
    
            } catch (error) {
                console.log(error.message);
            }
    
        }
    
    
        // product update
        if(e.target.classList.contains('fa-edit')){
    
            try {
    
                axios.get(`http://localhost:5050/api/v1/product/${singleProduct}`)
                .then( res => {
                    
    
                    const data = `
                    <div class="my-3">
                        
                        <input name="id" value="${ res.data.id }" type="hidden" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Name</label>
                        <input name="name" value="${ res.data.name }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Regular Price</label>
                        <input name="regular_price" value="${ res.data.regular_price }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Sale Price</label>
                        <input name="sale_price" value="${ res.data.sale_price }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Stock</label>
                        <input name="stock" value="${ res.data.stock }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Category</label>
                        <select name="category" id="" class="form-control">
                            <option value="">-select-</option>
                            <option  ${ (res.data ?.category == "Men") ? "selected" : ""} value="Men">Men</option>
                            <option ${ (res.data ?.category == "Women") ? "selected" : ""} value="Women">Women</option>
                            <option ${ (res.data ?.category == "Kids") ? "selected" : ""} value="Kids">Kids</option>
                            <option ${ (res.data ?.category == "Electronics") ? "selected" : ""} value="Electronics">Electronics</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <label for="">Tag</label>
                        <select name="tag" id="" class="form-control">
                            <option  value="">-select-</option>
                            <option ${ (res.data ?.tag == "Eid") ? "selected" : ""} value="Eid">Eid</option>
                            <option ${ (res.data ?.tag == "Puja") ? "selected" : ""} value="Puja">Puja</option>
                            <option ${ (res.data ?.tag == "Kids") ? "selected" : ""} value="Kids">Kids</option>
                            <option ${ (res.data ?.tag == "Dengue") ? "selected" : ""} value="Dengue">Dengue</option>
                        </select>
                    </div>
                    <div class="my-3">
                        <label for="">Status</label>
                        <input name="status" value="${ res.data.status }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Description</label>
                        <input name="description" value="${ res.data.description }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <img class="w-100" src="http://127.0.0.1:5050/images/product/${ res.data.photo }" alt="">
                    </div>
                    <div class="my-3">
                        <label for="">Photo</label>
                        <input name="product_photo" type="file" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Gallery</label>
                        <input name="product_gallery" multiple type="file" class="form-control">
                    </div>
                    <div class="my-3">
    
                        <input type="submit" value="Update" class="form-control btn btn-primary">
                    </div>
                    `;
    
                    if(product_update_form){
                        product_update_form.innerHTML = data;
                    }
    
                })
                .catch( err => console.log(err.message))
                
            } catch (error) {
                console.log(error.message);
            }
    
        }
    
    
        // delete data 
        if(e.target.classList.contains('fa-trash')){
    
            if( confirm('Are you sure to delete ?') ){
                try {
    
                    axios.delete(`http://localhost:5050/api/v1/product/${singleProduct}`)
                    .then( res => {
                        getAllProduct();
                    })
                    .catch( err => console.log(err.message));
                    
                } catch (error) {
                    console.log(error.message);
                }
            }
            
        }
        
    }
}




/**
 * submit product update form
 */
if(product_update_form){
    product_update_form.onsubmit = (e) => {
        e.preventDefault();
    
        const form_data = new FormData(e.target);
        const data = Object.fromEntries(form_data.entries());
    
        try {
    
            axios.put(`http://localhost:5050/api/v1/product/${data.id}`, data)
            .then( res => {
                getAllProduct()
            })
            .catch(  err => console.log(err.message))
            
        } catch (error) {
            console.log(error.message);
        }
    }
}








/**
 * get all categories
 */
const getAllCategories = () => {

    try {

        axios.get('http://localhost:5050/api/v1/category')
        .then( res => {

            let list = '';
            res.data.reverse().forEach(( item, index ) => {
            list += `
                <tr class="align-middle">
                    <td>${ index + 1 }</td>
                    <td>${ item.name }</td>
                    <td><span class="badge bg-success">${ item.status }</span></td>
                    <td><img style="width:40px; height:40px; object-fit:cover" src="http://127.0.0.1:5050/images/category/${ item.photo }"></td>
                        <td class="">
                            <a href="#update_category" data-bs-toggle="modal" single_view="${item.id}" class="btn btn-sm btn-warning "><i class="fas fa-edit"></i></a>
                            <a href="" class="btn btn-sm btn-danger delete-btn" delete_view="${item.id}"><i class="fas fa-trash"></i></a>
                        </td>
                </tr>
                `;

                if(category_list){
                    category_list.innerHTML = list;
                }
            });

        })
        .catch( err => console.log(err.message));
        
    } catch (error) {
        console.log(error.message);
    }

}

getAllCategories();





/**
 * create a new category
 * submit category form
 */
if(category_form){
    category_form.onsubmit = (e) => {
        e.preventDefault();
    
        try {
    
            // get form data
            const form_data = new FormData(e.target)
    
            axios.post('http://localhost:5050/api/v1/category', form_data)
            .then( res => {
                getAllCategories();
            })
            .catch( err => console.log(err.message))
            
        } catch (error) {
            console.log(error.message);
        }
    
    }
}




/**
 * edit , delete single category
 */
if(category_list){
    category_list.onclick = async (e) => {
        e.preventDefault();
    
        // get single ID
        const singleCategory = e.target.parentElement.getAttribute('single_view')
        const deleteCategory = e.target.getAttribute('delete_view')
            
        // update category
        if(singleCategory){
        
            try {
    
             await   axios.get(`http://localhost:5050/api/v1/category/`)
                .then( res => {

                    const singleID = res.data.find ( data => data.id == singleCategory );
                    
                    const data = `
                    <div class="my-3">                    
                        <input name="id" value="${ singleID.id }" type="hidden" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Name</label>
                        <input name="name" value="${ singleID.name }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <img class="w-100" src="http://127.0.0.1:5050/images/category/${ singleID.photo }" alt="">
                    </div>
                    <div class="my-3">
                        <label for="">Photo</label>
                        <input name="category_photo" type="file" class="form-control">
                    </div>
                    <div class="my-3">
    
                        <input type="submit" value="Update" class="form-control btn btn-primary">
                    </div>
                    `;
    
                    if(category_update_form){
                        category_update_form.innerHTML = data;
                    }
    
                })
                .catch( err => console.log(err.message));
                
            } catch (error) {
                console.log(error.message);
            }
    
        }
    
    
        // delete category 
        if(deleteCategory){
    
            if( confirm('Are you sure to delete ?') ){
                try {

                await    axios.delete(`http://localhost:5050/api/v1/category/${deleteCategory}`)
                    .then( res => {
                        getAllCategories();
                    })
                    .catch( err => console.log(err.message));
                    
                } catch (error) {
                    console.log(error.message);
                }
            }
            
        }
    
    }
}




/**
 * submit category update form
 */
 if(category_update_form){
    category_update_form.onsubmit = async (e) => {
        e.preventDefault();
    
        const form_data = new FormData(e.target);
        const data = Object.fromEntries(form_data.entries());
    
        try {
    
            axios.put(`http://localhost:5050/api/v1/category/${data.id}`, form_data)
            .then( res => {
                getAllCategories();
            })
            .catch( err => console.log(err.message))
            
        } catch (error) {
            console.log(error.message);
        }
    }
}


    
        
/**
 * get all tags
 */
const getAllTags = () => {

    try {

        axios.get('http://localhost:5050/api/v1/tag')
        .then( res => {

            let list = '';
            res.data.reverse().forEach(( item, index ) => {
            list += `
                <tr class="align-middle">
                    <td>${ index + 1 }</td>
                    <td>${ item.name }</td>
                    <td><span class="badge bg-success">${ item.status }</span></td>
                    <td class="">
                        <a href="#edit_tag" data-bs-toggle="modal" single_view="${item.id}" class="btn btn-sm btn-warning "><i class="fas fa-edit"></i></a>
                        <a href="" class="btn btn-sm btn-danger delete-btn" delete_view="${item.id}"><i class="fas fa-trash"></i></a>
                    </td>
                </tr>
                `;

                if(tag_list){
                    tag_list.innerHTML = list;
                }
            });

        })
        .catch( err => console.log(err.message));
        
    } catch (error) {
        console.log(error.message);
    }

}

getAllTags();




/**
 * create a new tag
 * submit tag form
 */
if(tag_form){
    tag_form.onsubmit = (e) => {
    

        try {
    
            e.preventDefault();
    
            // get form data
            const form_data = new FormData(e.target)
            const data = Object.fromEntries(form_data.entries())
            
    
            axios.post('http://localhost:5050/api/v1/tag', data)
            .then( res => {
                e.target.reset();
                getAllTags();
            })
            .catch( err => console.log(err.message))
            
        } catch (error) {
            console.log(error.message);
        }
    
    }
}





/**
 * edit , delete single tag
 */
if(tag_list){
    tag_list.onclick = async (e) => {

        e.preventDefault();
    
        // get single ID
        const singleTag = e.target.parentElement.getAttribute('single_view')
        const deleteTag = e.target.getAttribute('delete_view')
        
    
        // update tag
        if(singleTag){
    
            try {
    
            await axios.get(`http://localhost:5050/api/v1/tag/`)
                .then( res => {

                    const singleID = res.data.find ( data => data.id == singleTag );
                    
                    const data = `
                    <div class="my-3">                    
                        <input name="id" value="${ singleID.id }" type="hidden" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Name</label>
                        <input name="name" value="${ singleID.name }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
                        <label for="">Status</label>
                        <input name="status" value="${ singleID.status }" type="text" class="form-control">
                    </div>
                    <div class="my-3">
    
                        <input type="submit" value="Update" class="form-control btn btn-primary">
                    </div>
                    `;
    
                    if(tag_update_form){
                        tag_update_form.innerHTML = data;
                    }
    
                })
                .catch( err => console.log(err.message));
                
            } catch (error) {
                console.log(error.message);
            }
    
        }
    
    
        // delete tag 
        if(deleteTag){
    
            if( confirm('Are you sure to delete ?') ){
                try {
    
                await axios.delete(`http://localhost:5050/api/v1/tag/${deleteTag}`)
                    .then( res => {
                        getAllTags();
                    })
                    .catch( err => console.log(err.message));
                    
                } catch (error) {
                    console.log(error.message);
                }
            }
            
        }
    
    }
}





/**
 * submit tag update form
 */
 if(tag_update_form){
    tag_update_form.onsubmit = async (e) => {
        e.preventDefault();
    
        const form_data = new FormData(e.target);
        const data = Object.fromEntries(form_data.entries());
    
        try {
    
        await axios.put(`http://localhost:5050/api/v1/tag/${data.id}`, data)
            .then( res => {
                getAllTags();
            })
            .catch( err => console.log(err.message))
            
        } catch (error) {
            console.log(error.message);
        }
    }
}






