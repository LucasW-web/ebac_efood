import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { clear } from '../../store/reducers/cart'
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

  const itensCarrinho = useSelector((state: RootReducer) => state.cart.items)

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

  // Funções de Máscara (Formatação Visual)
  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é número
      .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona o hífen após o 5º dígito
      .substring(0, 9) // Limita o tamanho ao formato 00000-000
  }

  const maskCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d)/, '$1 $2') // Espaço a cada 4 dígitos
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2')
      .substring(0, 19) // Limita ao formato 0000 0000 0000 0000
  }

  const maskCVV = (value: string) => {
    return value.replace(/\D/g, '').substring(0, 3) // Limita a 3 dígitos numéricos
  }

  const maskMonthOrYear = (value: string) => {
    return value.replace(/\D/g, '').substring(0, 2) // Limita o mês/ano a 2 dígitos numéricos
  }

  // Validação ao Avançar da Entrega
  const handleAvancarParaPagamento = (e: React.FormEvent) => {
    e.preventDefault()

    const cepLimpo = delivery.zipCode.replace(/\D/g, '')
    if (cepLimpo.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 números.')
      return
    }

    setEtapa('pagamento')
  }

  // Validação ao Finalizar o Pedido
  const handleFinalizarPedido = async (e: React.FormEvent) => {
    e.preventDefault()

    const cartaoLimpo = payment.cardNumber.replace(/\D/g, '')
    if (cartaoLimpo.length < 16) {
      alert('Por favor, digite o número do cartão completo (16 dígitos).')
      return
    }

    if (payment.cardCode.length !== 3) {
      alert('O CVV deve ter exatamente 3 dígitos.')
      return
    }

    const mes = Number(payment.expiresMonth)
    if (mes < 1 || mes > 12) {
      alert('O mês de vencimento precisa ser entre 01 e 12.')
      return
    }

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
          zipCode: delivery.zipCode, // Pode enviar formatado ou usar cepLimpo se a API exigir apenas números
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
                placeholder="00000-000"
                value={delivery.zipCode}
                onChange={(e) =>
                  setDelivery({ ...delivery, zipCode: maskCEP(e.target.value) })
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
                placeholder="0000 0000 0000 0000"
                value={payment.cardNumber}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    cardNumber: maskCardNumber(e.target.value)
                  })
                }
              />
            </S.Row>
            <S.Row style={{ flex: 1 }}>
              <label>CVV</label>
              <input
                type="text"
                required
                placeholder="000"
                value={payment.cardCode}
                onChange={(e) =>
                  setPayment({ ...payment, cardCode: maskCVV(e.target.value) })
                }
              />
            </S.Row>
          </S.InlineGroup>
          <S.InlineGroup>
            <S.Row>
              <label>Mês de vencimento</label>
              <input
                type="text"
                required
                placeholder="MM"
                value={payment.expiresMonth}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    expiresMonth: maskMonthOrYear(e.target.value)
                  })
                }
              />
            </S.Row>
            <S.Row>
              <label>Ano de vencimento</label>
              <input
                type="text"
                required
                placeholder="AA"
                value={payment.expiresYear}
                onChange={(e) =>
                  setPayment({
                    ...payment,
                    expiresYear: maskMonthOrYear(e.target.value)
                  })
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
            Gostaria de agradecer a preferência!
          </S.TextConfirmacao>
          <S.ButtonGroup>
            <S.ButtonPrimary type="button" onClick={onBackToCart}>
              Concluir
            </S.ButtonPrimary>
          </S.ButtonGroup>
        </div>
      )}
    </S.SidebarContainer>
  )
}
