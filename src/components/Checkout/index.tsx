import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../../store' // Certifique-se de que o caminho até o store está correto
import { usePurchaseMutation } from '../../services/api'
import { clear, close } from '../../store/reducers/cart'
import * as S from './styles'

type CheckoutProps = {
  onBackToCart: () => void
}

type DeliveryData = {
  receiver: string
  description: string
  city: string
  zipCode: string
  number: number
  complement?: string
}

export const Checkout = ({ onBackToCart }: CheckoutProps) => {
  const dispatch = useDispatch()
  const [purchase, { isLoading }] = usePurchaseMutation()

  // Tipado corretamente usando RootReducer (Removido o any)
  const itensCarrinho = useSelector((state: RootReducer) => state.cart.items)

  // Removido o tipo any do itemAtual
  const precoTotal = itensCarrinho.reduce((acumulador: number, itemAtual) => {
    return acumulador + itemAtual.preco
  }, 0)

  const [etapa, setEtapa] = useState<'entrega' | 'pagamento' | 'confirmacao'>(
    'entrega'
  )
  const [orderId, setOrderId] = useState('')

  const [delivery, setDelivery] = useState<DeliveryData>({
    receiver: '',
    description: '',
    city: '',
    zipCode: '',
    number: 0,
    complement: ''
  })

  const [payment, setPayment] = useState({
    cardName: '',
    cardNumber: '',
    cardCode: '',
    expiresMonth: '',
    expiresYear: ''
  })

  const handleAvancarParaPagamento = (e: React.FormEvent) => {
    e.preventDefault()
    setEtapa('pagamento')
  }

  const handleFinalizarPedido = async (e: React.FormEvent) => {
    e.preventDefault()

    // Removido o tipo any do map
    const products = itensCarrinho.map((item) => ({
      id: item.id,
      price: item.preco
    }))

    const payload = {
      products,
      delivery: {
        receiver: delivery.receiver,
        address: {
          description: delivery.description,
          city: delivery.city,
          zipCode: delivery.zipCode,
          number: Number(delivery.number),
          complement: delivery.complement
        }
      },
      payment: {
        card: {
          name: payment.cardName,
          number: payment.cardNumber,
          code: Number(payment.cardCode),
          expires: {
            month: Number(payment.expiresMonth),
            year: Number(payment.expiresYear)
          }
        }
      }
    }

    try {
      const response = await purchase(payload).unwrap()
      setOrderId(response.orderId)
      dispatch(clear())
      setEtapa('confirmacao')
    } catch (error) {
      alert('Erro ao realizar o pagamento. Verifique os dados.')
    }
  }

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  return (
    <S.SidebarContainer>
      {etapa === 'entrega' && (
        <form onSubmit={handleAvancarParaPagamento}>
          <S.Title>Entrega</S.Title>
          <S.Row>
            <label>Quem irá receber</label>
            <input
              type="text"
              required
              value={delivery.receiver}
              onChange={(e) =>
                setDelivery({ ...delivery, receiver: e.target.value })
              }
            />
          </S.Row>
          <S.Row>
            <label>Endereço</label>
            <input
              type="text"
              required
              value={delivery.description}
              onChange={(e) =>
                setDelivery({ ...delivery, description: e.target.value })
              }
            />
          </S.Row>
          <S.Row>
            <label>Cidade</label>
            <input
              type="text"
              required
              value={delivery.city}
              onChange={(e) =>
                setDelivery({ ...delivery, city: e.target.value })
              }
            />
          </S.Row>
          <S.InlineGroup>
            <S.Row>
              <label>CEP</label>
              <input
                type="text"
                required
                value={delivery.zipCode}
                onChange={(e) =>
                  setDelivery({ ...delivery, zipCode: e.target.value })
                }
              />
            </S.Row>
            <S.Row>
              <label>Número</label>
              <input
                type="number"
                required
                value={delivery.number || ''}
                onChange={(e) =>
                  setDelivery({ ...delivery, number: Number(e.target.value) })
                }
              />
            </S.Row>
          </S.InlineGroup>
          <S.Row>
            <label>Complemento (opcional)</label>
            <input
              type="text"
              value={delivery.complement}
              onChange={(e) =>
                setDelivery({ ...delivery, complement: e.target.value })
              }
            />
          </S.Row>
          <S.ButtonGroup>
            <S.ButtonPrimary type="submit">
              Continuar com o pagamento
            </S.ButtonPrimary>
            <S.ButtonSecondary type="button" onClick={onBackToCart}>
              Voltar para o carrinho
            </S.ButtonSecondary>
          </S.ButtonGroup>
        </form>
      )}

      {etapa === 'pagamento' && (
        <form onSubmit={handleFinalizarPedido}>
          <S.Title>
            Pagamento - Valor a pagar {formatarPreco(precoTotal)}
          </S.Title>
          <S.Row>
            <label>Nome no cartão</label>
            <input
              type="text"
              required
              value={payment.cardName}
              onChange={(e) =>
                setPayment({ ...payment, cardName: e.target.value })
              }
            />
          </S.Row>
          <S.InlineGroup>
            <S.Row style={{ flex: 2 }}>
              <label>Número do cartão</label>
              <input
                type="text"
                required
                value={payment.cardNumber}
                onChange={(e) =>
                  setPayment({ ...payment, cardNumber: e.target.value })
                }
              />
            </S.Row>
            <S.Row style={{ flex: 1 }}>
              <label>CVV</label>
              <input
                type="text"
                required
                value={payment.cardCode}
                onChange={(e) =>
                  setPayment({ ...payment, cardCode: e.target.value })
                }
              />
            </S.Row>
          </S.InlineGroup>
          <S.InlineGroup>
            <S.Row>
              <label>Mês de vencimento</label>
              <input
                type="number"
                required
                value={payment.expiresMonth}
                onChange={(e) =>
                  setPayment({ ...payment, expiresMonth: e.target.value })
                }
              />
            </S.Row>
            <S.Row>
              <label>Ano de vencimento</label>
              <input
                type="number"
                required
                value={payment.expiresYear}
                onChange={(e) =>
                  setPayment({ ...payment, expiresYear: e.target.value })
                }
              />
            </S.Row>
          </S.InlineGroup>
          <S.ButtonGroup>
            <S.ButtonPrimary type="submit" disabled={isLoading}>
              {isLoading ? 'Processando...' : 'Finalizar pagamento'}
            </S.ButtonPrimary>
            <S.ButtonSecondary
              type="button"
              onClick={() => setEtapa('entrega')}
            >
              Voltar para a entrega
            </S.ButtonSecondary>
          </S.ButtonGroup>
        </form>
      )}

      {etapa === 'confirmacao' && (
        <div>
          <S.Title>Pedido confirmado - #{orderId}</S.Title>
          <S.TextConfirmacao>
            Estamos muito felizes em informar que seu pedido já está em processo
            de preparação e, em breve, será entregue no endereço fornecido.
          </S.TextConfirmacao>
          <S.TextConfirmacao style={{ marginBottom: '24px' }}>
            Gostaria de continuar navegando? Clique no botão abaixo para
            retornar à nossa lista de restaurantes.
          </S.TextConfirmacao>
          <S.ButtonPrimary type="button" onClick={() => dispatch(close())}>
            Concluir
          </S.ButtonPrimary>
        </div>
      )}
    </S.SidebarContainer>
  )
}
