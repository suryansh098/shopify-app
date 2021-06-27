import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createProduct, 
  listProducts,
  deleteProduct
} from '../actions/productActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { 
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET
} from '../contants/productConstants';

const ProductListScreen = (props) => {
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  
  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }

    if(successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if(window.confirm('Are you sure you want to delete this product ?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button
          type="button"
          className="primary"
          onClick={createHandler}
        >
          Create Product
        </button>
      </div>

      {/* Show when deleting a product */}
      { loadingDelete && <Loading></Loading>}
      { errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      
      {/* Show when creating a product */}
      { loadingCreate && <Loading></Loading>}
      { errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {
        loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">

            <thead>
              <tr>
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>PRICE ($)</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => 
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default ProductListScreen;