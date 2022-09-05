import {observable, action, runInAction, makeAutoObservable, computed} from 'mobx'
import {MobxStore} from './'
interface ProductInterface {
  cardPrefixNumber: string
  productName: string
  createdAt: any
  bureauBankName: string
}

export interface ProductType {
  productList: ProductInterface[]
  isLoading: boolean
}
class Products implements ProductType {
  @observable productList: ProductInterface[] = []
  @observable isLoading: boolean = false
  constructor(private rootStore: MobxStore) {
    makeAutoObservable(this)
  }
  @action
  setProductList = (productData: any) => {
    this.productList = productData
    return this.productList
  }

  @action
  setLoading = (loading: boolean) => {
    this.isLoading = loading
    return this.isLoading
  }
}
export default Products
