import React from "react"

import items from "./utils/items.json"

import Navbar from "./components/navbar"
import Item from "./components/item"

export default () => {
  const category = []
  new Set(items.map(item => item.category)).forEach(item => category.push(item))

  return (
    <>
      <Navbar />

      <div className="container">
        {category.map(key => {
          return (
            <div id={key} key={key} className="mt-3 mb-3 card">
              <h2 style={{ textTransform: "capitalize" }} className="card-header bg-dark text-light">{key}</h2>
              <div className="card-body">
                <div className="row">
                  {items.map(item => {
                    if (item.category == key) {
                      return <Item props={item} />
                    }
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}