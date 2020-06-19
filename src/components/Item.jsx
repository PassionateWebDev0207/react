import React from 'react'
import { Rate, Anchor } from 'antd'
import '../assets/item.scss'

const { Link } = Anchor

function Item(props) {
  return (
    <div className="item">
      <div className="item-image">
        <img src={props.image.original} alt={props.name} />
      </div>
      <div className="item-content">
        <div className="summary" dangerouslySetInnerHTML={{ __html: props.summary }} />
        <Anchor affix={false}>
          <Link href={props.url} title={props.url} />
        </Anchor>
        <Rate count="10" value={props.rate.average} allowHalf />
      </div>
    </div>
  )
}

export default Item