// src/components/RotaPDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// --- DEFINIÇÕES DE TAMANHO E UNIDADES ---
// Dimensões do formulário contínuo em milímetros
const FORM_WIDTH_MM = 240;
const FORM_HEIGHT_MM = 140;

// Função auxiliar para converter milímetros para pontos
const mmToPoints = (mm) => mm * 2.83465;

// Dimensões em pontos para uso no StyleSheet
const PAGE_WIDTH_PT = mmToPoints(FORM_WIDTH_MM);
const PAGE_HEIGHT_PT = mmToPoints(FORM_HEIGHT_MM);


// --- ESTILOS DO DOCUMENTO PDF ---
const styles = StyleSheet.create({
  page: {
    // Define o tamanho da página usando as dimensões personalizadas em pontos
    
    width: PAGE_WIDTH_PT, // 240mm
    height: PAGE_HEIGHT_PT, // 140mm

    margin: 0, // Remova as margens padrão para ter controle total do layout
    padding: 10, // Adicione um padding interno geral se desejar margens no conteúdo
    flexDirection: 'column',
    fontFamily: 'Helvetica', // Fonte padrão
    fontSize: 10, // Tamanho de fonte padrão
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    borderBottom: '1px solid #000',
    paddingBottom: 5,
  },
  section: {
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  value: {
    borderBottom: '1px solid #999', // Linha para campos de texto
    paddingBottom: 2,
    marginBottom: 3,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  fieldColumn: {
    flex: 1, // Divide o espaço igualmente entre as colunas
    marginRight: 10,
  },
  // Estilos específicos para o rodapé ou informações adicionais
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 7,
    color: '#555',
  },
  
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 2,
  },
  tableCell: {
    fontSize: 10,
  },

});

const VENDAS_POR_PAGINA = 14;


// --- COMPONENTE RotaPDF ---
const RotaPDF = ({ data }) => {
  const paginas = [];
  if (data.vendas && data.vendas.length > 0) {
    
for (let i = 0; i < data.vendas.length; i += VENDAS_POR_PAGINA) {
  const vendasPagina = data.vendas.slice(i, i + VENDAS_POR_PAGINA);
  paginas.push(
  <Page key={i} size={{width: PAGE_WIDTH_PT, height: PAGE_HEIGHT_PT}} style={styles.page}>
      {/* Cabeçalho do Formulário */}
      <View style={styles.header}>
        <Text>Relatório de Rota - Nº {data.rota.id}</Text>
      </View>

      {/* Seção de Dados da Rota */}
      <View style={styles.section}>
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Título da Rota:</Text>
            <Text style={styles.value}>{data.rota.titulo}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.value}>{data.rota.descricao}</Text>
          </View>
        </View>        

        
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Motorista Responsável:</Text>
            <Text style={styles.value}>{data.rota.pessoa ? data.rota.pessoa.nome : 'N/A'}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Placa do Veículo:</Text>
            <Text style={styles.value}>{data.rota.placa_veiculo}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Data de Saída:</Text>
            <Text style={styles.value}>{new Date(data.rota.data_saida+ 'T00:00:00').toLocaleDateString('pt-BR')}</Text>
          </View>
          {data.rota.data_retorno && (
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Data de Retorno:</Text>
            <Text style={styles.value}>{data.rota.data_retorno ? new Date(data.rota.data_retorno+ 'T00:00:00').toLocaleDateString('pt-BR') : ''}</Text>
          </View>

          )}
        </View>
      </View>

      {/* Seção de Vendas */}
      <View style={styles.section}>
        <Text style={styles.label}>Vendas:</Text>
        {data.vendas && data.vendas.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Nº Pedido</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Data Pedido</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Cliente</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Valor Total</Text></View>
            </View>
          {vendasPagina.map((venda) => (
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{venda.numero_documento}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{new Date(venda.data_venda+ 'T00:00:00').toLocaleDateString('pt-br')}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell} >{venda.cliente.nome.length > 30 ? venda.cliente.nome.slice(0, 30) + '...' : venda.cliente.nome }</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{
                                                                        new Intl.NumberFormat('pt-BR', {
                                                                            style: 'currency',
                                                                            currency: 'BRL',
                                                                          }).format(venda.total)
                                                                        }</Text></View>
            </View>
          ))}
          </View>
        ) : (
          <Text style={styles.text}>Nenhuma venda registrada para esta rota.</Text>
        )}
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text>Página {(i/VENDAS_POR_PAGINA)+1}</Text>
      </View>
    </Page>
  );
  }
}
  return <Document>{paginas}</Document>;
};
export default RotaPDF;