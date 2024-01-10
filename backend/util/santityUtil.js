const sanityFunction = (value) => {
  const type = typeof value;

  // Veri tipi kontrolü
  if (type !== "string" && type !== "number") {
    return null;
  }

  // SQL injection koruması
  if (type === "string") {
    if (value.includes(";")) {
      return null;
    }
  }

  if (type === "string") {
    if (value.includes("'")) {
      return null;
    }
  }

  if (type === "string") {
    if (value.includes("?")) {
      return null;
    }
  }

  // Sayısal değeri kontrol etme
  if (type === "number" && isNaN(value)) {
    return null;
  }

  return value;
};

module.exports = { sanityFunction };
