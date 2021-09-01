import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Head from 'next/head'

// Images
import Image from 'next/image'
import loadingGif from '../public/img/loading.gif'
import successIcon from '../public/img/success.png'
import errorIcon from '../public/img/error.png'

interface Data {
  name: string
  phone: string
  comment: string
  area: string
  date: string
  urgency: boolean
  activity: string
}

export default function Home() {
  const [data, setData] = useState<Data>({
    phone: '',
    comment: '',
    name: '',
    area: '',
    date: '',
    urgency: false,
    activity: '',
  })

  const [ticket, setTicket] = useState()

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setData(oldData => ({ ...oldData, [name]: value }))
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setModal(true)
    setLoading(true)
    axios.post('/api/', data)
      .then((res) => {
        setLoading(false)
        setSuccess(true)
        setTicket(res.data)
        return console.log('Atividade enviada com sucesso!', data)
      })
      .catch((e) => {
        setLoading(false)
        setError(true)
        setTimeout(function () { setError(false) }, 3000)
        setTimeout(function () { setModal(false) }, 3000)
        return console.log('Ops, algo deu errado!', e.message)
      })
  }

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSuccess(false)
    setModal(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Demandas SpaceSheep</title>
      </Head>

      {modal && (
        <div className={styles.wrapper}>
          <div className={styles.loading}>
            {loading && <Image src={loadingGif} />}
            {success && (
              <div>
                <Image src={successIcon} />
                <p>Atividade enviada com sucesso!</p>
                <p>Seu Ticket: <b>{ticket}</b></p>
                <p className={styles.span}>*Salve para mais tarde!</p>
                <button onClick={closeModal} className={styles.btn}>Fechar</button>
              </div>
            )}
            {error && (
              <div>
                <Image src={errorIcon} />
                <p>Ops, algo deu errado!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!modal && (
        <div className={styles.anima}>
          <form className={styles.form} onSubmit={submitForm}>
            <h1 className={styles.title}>Demandas SpaceSheep</h1>
            <div className={styles.inputs}>
              <div className={styles.mr}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Seu nome"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.mr}>
                <label htmlFor="phone">Telefone</label>
                <input
                  type="string"
                  name="phone"
                  id="phone"
                  placeholder="(19) 99999-9999"
                  value={data.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="area">Sua Área</label>
                <input
                  type="text"
                  name="area"
                  id="area"
                  placeholder="Área de atuação"
                  value={data.area}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.group}>
                <div className={styles.data}>
                  <label htmlFor="date">Data</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.checkbox}>
                  <label htmlFor="urgency">Urgênte?</label>
                  <input
                    type="checkbox"
                    id="urgency"
                    name="urgency"
                    onChange={(e) => data.urgency = e.target.checked}
                    defaultChecked={data.urgency}
                  />
                </div>
              </div>
              <div className={styles.full}>
                <label htmlFor="activity">Atividade</label>
                <select id="ctivity" name="activity" onChange={handleChange} value={data.activity}>
                  <option>Selecione...</option>
                  <option>Edição</option>
                  <option>Fotografia</option>
                  <option>Gravação</option>
                  <option>Reunião</option>
                  <option>Cronograma</option>
                  <option>Design</option>
                  <option>Motion</option>
                  <option>Roteiro / legenda</option>
                  <option>Apresentação (PPT/PDF)</option>
                  <option>Social Media</option>
                  <option>Revisão</option>
                  <option>ADS</option>
                  <option>Programação</option>
                  <option>E-mail</option>
                  <option>Institucional</option>
                  <option>Adm</option>
                  <option>Corte</option>
                  <option>Diário Consult</option>
                  <option>Cobrança/Validação</option>
                  <option>Suporte</option>
                  <option>Spotify</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="comment">Descrição</label>
              <textarea
                name="comment"
                id="comment"
                placeholder="Descreva a atividade..."
                value={data.comment}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <button className={styles.btn} type="submit">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
