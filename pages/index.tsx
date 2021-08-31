import React, { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'

interface Data {
  name: string;
  phone: string;
  message: string;
  area: string;
  date: string;
  urgency: boolean;
  activity: string;
}

export default function Home() {
  const [data, setData] = useState<Data>({
    phone: '',
    message: '',
    name: '',
    area: '',
    date: '',
    urgency: false,
    activity: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData(oldData => ({ ...oldData, [name]: value }));
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/', data)
      .then(() => {
        return console.log('Thank you for contacting us!', data);
      })
      .catch((e) => {
        return console.log('Something bad happened', e.message);
      })
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>Demandas SpaceSheep</h1>
        <div className={styles.inputs}>
          <div className={styles.m}>
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
          <div className={styles.m}>
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
        <div className={styles.input}>
          <div className={styles.m}>
            <label htmlFor="date">Data</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </div>
          <div className={styles.m}>
            <label htmlFor="urgency">Urgênte?</label>
            <input
              type="checkbox"
              id="urgency"
              name="urgency"
              defaultChecked={data.urgency}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="activity">Atividade</label>
            <select
              id="activity"
              name="activity"
            >
              <option value="-1" selected>Selecione...</option>
              <option value="1">Edição</option>
              <option value="Fotografia">Fotografia</option>
              <option value="Gravação">Gravação</option>
              <option value="Reunião">Reunião</option>
              <option value="Cronograma">Cronograma</option>
              <option value="Design">Design</option>
              <option value="Motion">Motion</option>
              <option value="Roteiro / legenda">Roteiro / legenda</option>
              <option value="Apresentação (PPT/PDF)">Apresentação (PPT/PDF)</option>
              <option value="Social Media">Social Media</option>
              <option value="Revisão">Revisão</option>
              <option value="ADS">ADS</option>
              <option value="Programação">Programação</option>
              <option value="E-mail">E-mail</option>
              <option value="Institucional">Institucional</option>
              <option value="Adm">Adm</option>
              <option value="Corte">Corte</option>
              <option value="Diário Consult">Diário Consult</option>
              <option value="Cobrança/Validação">Cobrança/Validação</option>
              <option value="Suporte">Suporte</option>
              <option value="Spotify">Spotify</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message">Descrição</label>
          <textarea
            name="message"
            id="message"
            placeholder="Descreva a atividade..."
            rows={5}
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
