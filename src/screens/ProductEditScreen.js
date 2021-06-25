import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductDetails, updateProduct } from '../actions/productActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../contants/productConstants';

const ProductEditScreen = (props) => {

  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {

    if(successUpdate) {
      props.history.push('/productlist');
    }

    if(!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(fetchProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }

  }, [product, productId, dispatch, successUpdate, props.history]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description
      })
    );

  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        
        <div>
          <h1>Edit product : {productId}</h1>
        </div>

        {loadingUpdate && <Loading></Loading>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

        { loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="price">Price ($)</label>
              <input 
                type="text" 
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="image">Image</label>
              <input 
                type="text" 
                id="image"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <input 
                type="text" 
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input 
                type="text" 
                id="brand"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input 
                type="text" 
                id="countInStock"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea 
                type="text" 
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label></label>
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
    
  );
}

export default ProductEditScreen;