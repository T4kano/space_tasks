import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { name, phone, area, date, urgency, comment, activity } = req.body
  const database = await notion.databases.query({
    database_id: process.env.DATABASE_ID || ''
  })

  console.log(urgency);

  const ticket = String(database.results.length + 1)
  let status = urgency == true ? 'Aguardando validação' : 'Pra fazer'

  if(date == '') {
    date = new Date();
    let day = date.getDate().toString()
    let month = date.getMonth().toString()
    let year = date.getFullYear()
    if(day.toString().length == 1) day = `0${day}`
    if(month.toString().length == 1) month = `0${month}`
    date = `${year}-${month}-${day}`
  }

  await notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID || '',
    },
    properties: {
      'Ticket': {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: ticket
            }
          }
        ]
      },
      'Telefone Solicitante': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: phone
            }
          }
        ]
      },
      'Nome Solicitante': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: name
            }
          }
        ]
      },
      'Comentário': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: comment
            }
          }
        ]
      },
      'Data Solicitante': {
        type: 'date',
        date: {
          start: date
        }
      },
      'Área Solicitante': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: area
            }
          }
        ]
      },
      'Status': {
        type: 'select',
        select: {
          name: status
        }
      },
      'Equipe': {
        type: 'multi_select',
        multi_select: [
          {
            name: 'Corporate'
          }
        ]
      },
      'Cliente': {
        type: 'multi_select',
        multi_select: [
          {
            name: 'LTW Consult'
          }
        ]
      },
      'Responsáveis': {
        type: 'multi_select',
        multi_select: [
          {
            name: 'Gute'
          }
        ]
      },
      'Atividade': {
        type: 'multi_select',
        multi_select: [
          {
            name: activity
          }
        ]
      },
    }
  }).then(() => {
    res.status(201).json({ message: 'Sucesso!' })
  }).catch((error) => {
    console.log(`${error}\n${date}`)
    res.status(500).json({ message: 'Ops, algo deu errado!' })
  })
}
