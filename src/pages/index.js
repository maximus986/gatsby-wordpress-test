import React, { useState } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const CONTACT_MUTATION = gql`
  mutation createContactSubmissionMutation(
    $clientMutationId: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $subject: String!
    $message: String!
  ) {
    createContactSubmission(
      input: {
        clientMutationId: $clientMutationId
        firstName: $firstName
        lastName: $lastName
        email: $email
        subject: $subject
        message: $message
      }
    ) {
      success
      data
    }
  }
`

const IndexPage = () => {
  const [firstNameValue, setFirstNameValue] = useState("")
  const [lastNameValue, setLastNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [subjectValue, setSubjectValue] = useState("")
  const [messageValue, setMessageValue] = useState("")

  const data = useStaticQuery(graphql`
    query MyQuery {
      wpgraphql {
        backgroundImages {
          nodes {
            backgroundImage {
              bgimage {
                imageFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
                sourceUrl
              }
            }
          }
        }
      }
    }
  `)

  console.log(
    data.wpgraphql.backgroundImages.nodes[0].backgroundImage.bgimage.imageFile
      .childImageSharp.fluid
  )

  return (
    <Layout>
      <h1>Contact Form Submission to WordPress with GraphQL</h1>
      {data.wpgraphql.backgroundImages.nodes.map((img, i) => (
        <Img
          fluid={img.backgroundImage.bgimage.imageFile.childImageSharp.fluid}
          key={i}
        />
      ))}

      <Mutation mutation={CONTACT_MUTATION}>
        {(createContactSubmission, { loading, error, data }) => (
          <React.Fragment>
            <form
              onSubmit={async event => {
                event.preventDefault()
                createContactSubmission({
                  variables: {
                    clientMutationId: "example",
                    firstName: firstNameValue,
                    lastName: lastNameValue,
                    email: emailValue,
                    subject: subjectValue,
                    message: messageValue,
                  },
                })
              }}
            >
              <label htmlFor="firstNameInput">First Name: </label>
              <input
                id="firstNameInput"
                value={firstNameValue}
                onChange={event => {
                  setFirstNameValue(event.target.value)
                }}
              />

              <br />
              <br />

              <label htmlFor="lastNameInput">Last Name: </label>
              <input
                id="lastNameInput"
                value={lastNameValue}
                onChange={event => {
                  setLastNameValue(event.target.value)
                }}
              />

              <br />
              <br />

              <label htmlFor="emailInput">Email: </label>
              <input
                id="emailInput"
                value={emailValue}
                onChange={event => {
                  setEmailValue(event.target.value)
                }}
              />

              <label htmlFor="subjectInput">Subject: </label>
              <input
                id="subjectInput"
                value={subjectValue}
                onChange={event => {
                  setSubjectValue(event.target.value)
                }}
              />

              <label htmlFor="messageInput">Message: </label>
              <textarea
                id="messageInput"
                value={messageValue}
                onChange={event => {
                  setMessageValue(event.target.value)
                }}
              ></textarea>

              <br />
              <br />

              <button type="submit">Send it!</button>
            </form>

            <div style={{ padding: "20px" }}>
              {loading && <p>Loading...</p>}
              {error && (
                <p>An unknown error has occured, please try again later...</p>
              )}
              {data && <p>yeah boi</p>}
            </div>
          </React.Fragment>
        )}
      </Mutation>
      <pre>
        <code>
          {JSON.stringify(
            {
              clientMutationId: "example",
              firstName: firstNameValue,
              lastName: lastNameValue,
              email: emailValue,
              subject: subjectValue,
              message: messageValue,
            },
            null,
            2
          )}
        </code>
      </pre>
    </Layout>
  )
}

export default IndexPage
