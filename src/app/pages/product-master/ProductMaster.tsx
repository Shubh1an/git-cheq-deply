/* eslint-disable jsx-a11y/anchor-is-valid */
import {observer} from 'mobx-react'
import moment from 'moment'
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {MobxStore} from '../../../mobx'
import Product from '../../../services/Product'
import DeleteModal from '../../../_metronic/helpers/components/DeleteModal'
import {PageTitle} from '../../../_metronic/layout/core'
import Loader from '../../../_metronic/loader/loader'
import {
  MixedWidget2,
  MixedWidget10,
  MixedWidget11,
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
} from '../../../_metronic/partials/widgets'
import {getEvent} from '../../modules/event/core/_requests'
import {deleteProductById, fetchProductList} from '../../modules/product/core/_requests'

type Props = {
  productList: any
  getProductList: any
}

const ProductMaster: FC<Props> = ({getProductList, productList}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [id, setId] = useState<any>()
  return (
    <div
      style={{
        paddingInline: '50px',
        paddingInlineStart: '4.7rem',
        background: '#fff',
        border: '1px solid #f5f8fa',
        paddingBlock: '30px',
      }}
      className='rounded-4'
    >
      {showDelete && (
        <DeleteModal
          id={id}
          show={showDelete}
          setShow={setShowDelete}
          setId={setId}
          handleDelete={Product.removeProduct}
          title='product'
        />
      )}
      <Loader isLoading={loading} />
      {/* begin::Row */}
      <div className='d-flex justify-content-between gy-5 g-xl-8'>
        <div>
          <h1> Product Master</h1>
        </div>
        <div>
          <button className='btn btn-primary me-4 px-6' onClick={() => navigate('create')}>
            Add Product
          </button>
        </div>
      </div>
      <div className='row mt-3'>
        <table className='table align-middle gs-0 gy-5 '>
          <thead
            style={{
              background: '#F3F6F9',
              height: '3rem',
              verticalAlign: 'middle',
              textAlign: 'center',
              borderRadius: '6px',
            }}
          >
            <tr>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-150px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Prefix Number
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-140px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Product Name
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Created At
              </th>

              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Delete
              </th>
              <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Detail
              </th>
              {/* <th
                style={{color: '#B5B5C3'}}
                className='p-0 min-w-120px  fw-bold text-hover-primary mb-3 fs-6'
              >
                Update
              </th> */}
            </tr>
          </thead>

          {/* begin::Table body */}
          <tbody style={{textAlign: 'center'}} className='mt-4'>
            {productList?.map((item: any) => (
              <tr className=''>
                {/* <td>
                  {item?.availableAttributes?.map((attr: string) => (
                    <span
                      className='text-dark fw-bold text-hover-primary mb-1 fs-6 '
                      style={{marginRight: '4px'}}
                    >
                      {attr},
                      <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' />
                    </span>
                  ))}
                </td> */}
                <td>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.cardPrefixNumber}
                    {/* <img src={toAbsoluteUrl('/media/svg/avatars/043-boy-18.svg')} alt='' /> */}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {item?.productName}
                  </span>
                </td>
                <td className=''>
                  <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    {moment(item?.createdAt).format('DD MMM YYYY hh:mm:ss')}
                  </span>
                </td>

                <td className=''>
                  {/* <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                    <i className='fa-solid fa-trash-can text-danger cursor-pointer'></i>
                  </span> */}
                  {/* <DeleteModal
                    handleDelete={Product.removeProduct}
                    id={item?._id}
                    title='product'
                  /> */}
                </td>
                <td>
                  <div>
                    <button
                      className='btn btn-secondary me-2 px-4'
                      onClick={() => navigate(`view/${item?._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
    </div>
  )
}
const ProductMasterWrapper: FC = observer(() => {
  const intl = useIntl()
  const {productStore} = MobxStore.getInstance()

  const getProductList = async () => {
    try {
      // const res: any = await fetchProductList()
      // setProductList(res?.data?.data)
      // setLoading(false)
      Product.getAllProducts()
    } catch (err) {
      toast.error('something went wrong')
    }
  }

  useEffect(() => {
    getProductList()
    return () => {
      Product.clearProductList()
    }
  }, [])
  return (
    <>
      <Loader isLoading={productStore.isLoading} />
      <PageTitle breadcrumbs={[]}>Events</PageTitle>
      <ProductMaster productList={productStore.productList} getProductList={getProductList} />
    </>
  )
})

export default ProductMasterWrapper
