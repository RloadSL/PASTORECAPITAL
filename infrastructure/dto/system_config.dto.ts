export type PLANS_TYPE = 'guest' | 'basic' | 'plus' |'premium'
export interface  PLANS {
  basic: {
    price: {
      year: number,
      month: number
    }
  },
  plus: {
    price: {
      year: number,
      month: number
    }
  },
  premium: {
    price: {
      year: number,
      month: number
    }
  }
}