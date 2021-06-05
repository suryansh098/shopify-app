import React, { useEffect } from 'react';
import Product from '../components/Product';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector( state => state.productList);
  const {loading, error, products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      { loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <div className="row center">
        {
          products.map(product => (
            <Product key={product._id} product={product} />
          ))
        }
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
