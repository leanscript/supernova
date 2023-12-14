const validateData = (parsedFields) => {
  const errors = {}
  parsedFields.forEach((field) => {
    if (field.validation) {
      try {
        field.validation.validateSync(field.value, { abortEarly: false })
      } catch (e) {
        errors[field.id] = { errors: e.errors }
      }
    }
  })
  return errors
}

export default validateData
