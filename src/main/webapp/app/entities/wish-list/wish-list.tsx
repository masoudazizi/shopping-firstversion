import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IWishList } from 'app/shared/model/wish-list.model';
import { getEntities } from './wish-list.reducer';

export const WishList = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const wishListList = useAppSelector(state => state.wishList.entities);
  const loading = useAppSelector(state => state.wishList.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="wish-list-heading" data-cy="WishListHeading">
        <Translate contentKey="shoppingApp.wishList.home.title">Wish Lists</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="shoppingApp.wishList.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/wish-list/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="shoppingApp.wishList.home.createLabel">Create new Wish List</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {wishListList && wishListList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="shoppingApp.wishList.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="shoppingApp.wishList.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="shoppingApp.wishList.restricted">Restricted</Translate>
                </th>
                <th>
                  <Translate contentKey="shoppingApp.wishList.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {wishListList.map((wishList, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/wish-list/${wishList.id}`} color="link" size="sm">
                      {wishList.id}
                    </Button>
                  </td>
                  <td>{wishList.title}</td>
                  <td>{wishList.restricted ? 'true' : 'false'}</td>
                  <td>{wishList.customer ? <Link to={`/customer/${wishList.customer.id}`}>{wishList.customer.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/wish-list/${wishList.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/wish-list/${wishList.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/wish-list/${wishList.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="shoppingApp.wishList.home.notFound">No Wish Lists found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WishList;
