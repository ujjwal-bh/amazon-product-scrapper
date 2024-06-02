interface IProps {
    img: string,
    url: string,
    title: string,
    price: string
}
export default function Product({img, url, title, price}: IProps) {
  return (
    <div className='single-product-container'>
        <a className="img-container" href={url} target="_blank">
            <img src={img} alt={title} />
        </a>
        <div className='single-product-main'>
            <span className="single-product-title">{title}</span>
            <span className="single-product-price">Rs {price}</span>
        </div>
    </div>
  )
}
