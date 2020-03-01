import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => {
  return (
    <Layout>
      <SEO title="Page two" />

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage
