const handles = [
  'joylintp', 'YoJaHuang', 'emanlaicepsa', 'WiwiHo', 'ub33',
  'YJU', 'LiPro', 'HNO2', 'ToMmyDong', 'detaomega',
  'nella17', '2qbingxuan', 'Seanliu', 'casperwang', 'wanling1212',
  'tim25871014', 'SorahISA', 'arctan', 'PolarisChiba', 'daniel071292',
  'erd1', 'doublewang', 'YenSean', 'Kevin_Zhang-TW', 'balbit',
  'coldEr66', 'hg8398', 'Nkl5RDZZZVq1N2F0', 'Yayun146', 'Ccucumber12',
  'CoolBANGstone', 'ericxiao',
];

const ratingColor = [
  {rating: 0, color: 'black'},
  {rating: 1200, color: 'gray'},
  {rating: 1400, color: 'green'},
  {rating: 1600, color: 'cyan-blue'},
  {rating: 1900, color: 'blue'},
  {rating: 2100, color: 'purple'},
  {rating: 2400, color: 'orange'},
  {rating: 3000, color: 'red'},
  {rating: 10000, color: 'red-black'},
];

let desc = true;

let data = [];

async function getData() {
  await fetch(encodeURI(`https://codeforces.com/api/user.info?handles=${handles.join(';')}`), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
      .then((res) => res.json())
      .then((res) => {
        if (res.status !== 'OK') {
          throw new Error('error');
        }

        res.result.forEach((user) => {
          data.push({
            handle: user.handle,
            rating: user.rating || 0,
          });
        });
      });
}

function getColor(rating) {
  for (const rc of ratingColor) {
    if (rating <= rc.rating) {
      return rc.color;
    }
  }
  return 'black';
}

function updateTable(desc = true) {
  data.sort((lhs, rhs) => {
    return (lhs.rating - rhs.rating) ^ (desc ? 1 : -1);
  });

  let inner = '';
  for (const res of data) {
    inner += `<div class="divTableRow" onclick="window.open('https://codeforces.com/profile/${res.handle}');">
  <div class="divTableCell">
    <span class="handle ${getColor(res.rating || -1)}">${res.handle}</span>
  </div>
  <div class="divTableCell">${res.rating || 0}</div>
</div>`;
  }
  document.getElementById('tablebody').innerHTML = inner;
}

function toggleSort() {
  desc = !desc;
  if (desc) {
    document.getElementById('icon').innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M7,10L12,15L17,10H7Z"></svg>`
  } else {
    document.getElementById('icon').innerHTML = `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M7,15L12,10L17,15H7Z"></svg>`;
  }
  updateTable(desc);
}

async function main() {
  await getData();
  toggleSort();
}
