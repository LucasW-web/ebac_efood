import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import { close, remove } from '../../store/reducers/cart'
import Button from '../Button'
import { Checkout } from '../Checkout'
import { formataPreco } from '../../utils/formatters'
import {
  CartContainer,
  Overlay,
  SideBar,
  CartItem,
  Price,
  CartCloseButton
} from './styles'

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false)
  const { items, isOpen } = useSelector((state: RootReducer) => state.cart)
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
    setIsCheckout(false)
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const getValorTotal = () => {
    return items.reduce((acumulador, item) => {
      return acumulador + item.preco
    }, 0)
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <SideBar>
        {isCheckout ? (
          <Checkout onBackToCart={() => setIsCheckout(false)} />
        ) : (
          <div>
            <div className="close-button">
              <CartCloseButton onClick={closeCart} />
            </div>

            {items.length > 0 ? (
              <div>
                <ul>
                  {items.map((item) => (
                    <CartItem key={item.id}>
                      <button
                        onClick={() => removeItem(item.id)}
                        type="button"
                      />
                      <img src={item.foto} alt={item.nome} />
                      <div>
                        <h3>{item.nome}</h3>
                        <p>{formataPreco(item.preco)}</p>
                      </div>
                    </CartItem>
                  ))}
                </ul>
                <Price>
                  <p>Valor total</p>
                  <p>{formataPreco(getValorTotal())}</p>
                </Price>
                <Button
                  type="button"
                  title="Clique para continuar com a entrega"
                  variant="secondary"
                  onClick={() => setIsCheckout(true)}
                >
                  Continuar com a entrega
                </Button>
              </div>
            ) : (
              <p
                style={{
                  color: '#FFEED2',
                  textAlign: 'center',
                  marginTop: '24px'
                }}
              >
                Seu carrinho está vazio.
              </p>
            )}
          </div>
        )}
      </SideBar>
    </CartContainer>
  )
}

export default Cart
