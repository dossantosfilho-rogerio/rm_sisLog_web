export const getDataFormatadaISO = (date) => {
    try {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses em JavaScript começam em 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;

    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
