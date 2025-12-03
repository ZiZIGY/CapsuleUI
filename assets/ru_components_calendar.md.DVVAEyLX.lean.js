import{_ as h,C as l,c as e,o as k,ag as a,j as i,G as t}from"./chunks/framework.DpfH8Q0y.js";const _=JSON.parse('{"title":"Calendar","description":"","frontmatter":{},"headers":[],"relativePath":"ru/components/calendar.md","filePath":"ru/components/calendar.md","lastUpdated":1764790166000}'),p={name:"ru/components/calendar.md"},E={style:{margin:"1rem 0","max-width":"400px"}},d={style:{margin:"1rem 0","max-width":"400px"}},r={style:{margin:"1rem 0","max-width":"400px"}},g={style:{margin:"1rem 0","max-width":"400px"}},y={style:{margin:"1rem 0","max-width":"400px"}},c={style:{margin:"1rem 0","max-width":"400px"}},o={style:{margin:"1rem 0","max-width":"400px"}},F={style:{margin:"1rem 0","max-width":"400px"}},u={style:{margin:"1rem 0","max-width":"400px"}};function C(m,s,D,B,b,A){const n=l("capsule-calendar");return k(),e("div",null,[s[2]||(s[2]=a("",6)),i("div",E,[t(n)]),s[3]||(s[3]=a("",2)),i("div",d,[t(n,{value:"2024-03-15"})]),s[4]||(s[4]=a("",2)),i("div",r,[t(n,{"display-year":"2024","display-month":"5"})]),s[5]||(s[5]=a("",3)),i("div",g,[t(n,{"min-date":"2024-01-01","max-date":"2024-12-31"})]),s[6]||(s[6]=a("",3)),i("div",y,[t(n,{"disabled-dates":"2024-03-10,2024-03-15,2024-03-20"})]),s[7]||(s[7]=a("",3)),i("div",c,[t(n,{locale:"ru-RU"})]),s[8]||(s[8]=a("",1)),i("div",o,[t(n,{locale:"de-DE"})]),s[9]||(s[9]=a("",3)),i("div",F,[s[0]||(s[0]=i("div",{style:{display:"flex","justify-content":"space-between","align-items":"center","margin-bottom":"1rem"}},[i("button",{onclick:`
        const cal = document.querySelector('#calendar-nav-example-ru');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        document.querySelector('#month-year-display-ru').textContent = months[newMonth] + ' ' + newYear;
      `,style:{padding:"0.5rem 1rem",cursor:"pointer"}}," ← Назад "),i("span",{id:"month-year-display-ru",style:{"font-weight":"600"}},"Январь 2024"),i("button",{onclick:`
        const cal = document.querySelector('#calendar-nav-example-ru');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) { newMonth = 0; newYear++; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        document.querySelector('#month-year-display-ru').textContent = months[newMonth] + ' ' + newYear;
      `,style:{padding:"0.5rem 1rem",cursor:"pointer"}}," Вперед → ")],-1)),t(n,{id:"calendar-nav-example-ru"})]),s[10]||(s[10]=a("",3)),i("div",u,[s[1]||(s[1]=i("input",{type:"text",id:"date-input-example-ru",style:{width:"100%",padding:"0.5rem","margin-bottom":"1rem","box-sizing":"border-box"},placeholder:"YYYY-MM-DD",pattern:"\\d{4}-\\d{2}-\\d{2}",onblur:`
      const dateValue = this.value.trim();
      const dateRegex = /^\\d{4}-\\d{2}-\\d{2}$/;
      if (dateValue && dateRegex.test(dateValue)) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          const cal = document.querySelector('#calendar-input-example-ru');
          cal.setSelectedDate(dateValue);
          cal.setDisplayDate(date.getFullYear(), date.getMonth());
        }
      }
    `,onkeypress:`
      if (event.key === 'Enter') {
        const dateValue = this.value.trim();
        const dateRegex = /^\\d{4}-\\d{2}-\\d{2}$/;
        if (dateValue && dateRegex.test(dateValue)) {
          const date = new Date(dateValue);
          if (!isNaN(date.getTime())) {
            const cal = document.querySelector('#calendar-input-example-ru');
            cal.setSelectedDate(dateValue);
            cal.setDisplayDate(date.getFullYear(), date.getMonth());
          }
        }
        this.blur();
      }
    `},null,-1)),t(n,{id:"calendar-input-example-ru",oninput:"document.querySelector('#date-input-example-ru').value = event.detail.value || ''"})]),s[11]||(s[11]=a("",30))])}const q=h(p,[["render",C]]);export{_ as __pageData,q as default};
