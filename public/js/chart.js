let high_pr = parseInt(document.getElementById("high_pr").innerText)
let normal_pr = parseInt(document.getElementById("normal_pr").innerText)
let low_pr = parseInt(document.getElementById("low_pr").innerText)
console.log(high_pr)

const chartData = {
    labels: ["Normal", "Low", "High"],
    data: [normal_pr, low_pr, high_pr],
  };
  
  const myChart = document.querySelector(".ticket_donut");
  const ul = document.querySelector(".programming-stats .details ul");
  
  new Chart(myChart, {
    type: "doughnut",
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: "count",
          data: chartData.data,
        },
      ],
    },
    options: {
      borderWidth: 10,
      borderRadius: 2,
      hoverBorderWidth: 0,
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
  
  const populateUl = () => {
    chartData.labels.forEach((l, i) => {
      let li = document.createElement("li");
      li.innerHTML = `${l}: <span class='percentage'>${chartData.data[i]}%</span>`;
      ul.appendChild(li);
    });
  };
  
  populateUl();
    populateUl();