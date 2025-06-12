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
    fontSize: 8,
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

// --- COMPONENTE RotaPDF ---
const VendaPDF = ({ data }) => (
  <Document>
    <Page size={{width: PAGE_WIDTH_PT, height: PAGE_HEIGHT_PT}} style={styles.page}>
      {/* Cabeçalho do Formulário */}
      <View style={styles.header}>
        <Text>Venda - Nº {data.numero_documento}</Text>
      </View>

      {/* Seção de Dados da Rota */}
      <View style={styles.section}>
        <View style={styles.fieldRow}>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Cliente:</Text>
            <Text style={styles.value}>{data.cliente.nome}</Text>
          </View>
          <View style={styles.fieldColumn}>
            <Text style={styles.label}>Data da Venda:</Text>
            <Text style={styles.value}>{new Date(data.data_venda+ 'T00:00:00').toLocaleDateString('pt-BR')}</Text>
          </View>
        </View>        

      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Produtos:</Text>
        {data.itens_venda && data.itens_venda.length > 0 ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Produto</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Quantidade</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Valor Un.</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Valor Total</Text></View>
            </View>
          {data.itens_venda.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.produto.nome}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quantidade}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.preco_unitario}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{item.total}</Text></View>
            </View>
          ))}
          </View>
        ) : (
          <Text style={styles.text}>Nenhum produto registrado para esta venda.</Text>
        )}
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text>Documento gerado automaticamente em {new Date().toLocaleDateString('pt-BR')} {new Date().toLocaleTimeString('pt-BR')}</Text>
      </View>
    </Page>
  </Document>
);

export default VendaPDF;