import { useParams } from 'react-router-dom'
import Banner from '../../components/Banner'
import HeaderPerfil from '../../components/HeaderPerfil'
import ProductList from '../../components/ProductList'
import { useGetPratosQuery } from '../../services/api'

const Perfil = () => {
  const { id } = useParams()

  const { data: restaurante } = useGetPratosQuery(id || '')

  if (!restaurante) return <h3>Carregando...</h3>

  return (
    <>
      <HeaderPerfil />
      <Banner
        capa={restaurante.capa}
        categoria={restaurante.tipo}
        nome={restaurante.titulo}
      />
      <ProductList pratos={restaurante.cardapio} />
    </>
  )
}

export default Perfil
