function appendToExpression(value) {
    const expressionField = document.getElementById('expression');
    expressionField.value += value;
  }

  function clearExpression() {
    document.getElementById('expression').value = '';
  }

  function calculate() {
    const expressionField = document.getElementById('expression');
    const expression = expressionField.value;

    try {
      const result = eval(expression); // This can be improved for better security.
      expressionField.value = result;

      // Save the calculation to local storage
      const calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
      calculationHistory.push({ expression, result });
      localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));

      // Refresh history
      displayHistory();
    } catch (error) {
      expressionField.value = 'Error';
    }
  }

  function displayHistory() {
    const calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    calculationHistory.forEach((calculation, index) => {
      const li = document.createElement('li');
      li.textContent = `${calculation.expression} = ${calculation.result}`;
      historyList.appendChild(li);
    });
  }

  // Fetch history on page load
  displayHistory();