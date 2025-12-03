import{_ as l,C as e,c as h,o as p,ag as a,j as i,G as n}from"./chunks/framework.DpfH8Q0y.js";const _=JSON.parse('{"title":"Calendar","description":"","frontmatter":{},"headers":[],"relativePath":"components/calendar.md","filePath":"components/calendar.md","lastUpdated":1764790166000}'),k={name:"components/calendar.md"},d={style:{margin:"1rem 0","max-width":"400px"}},E={style:{margin:"1rem 0","max-width":"400px"}},r={style:{margin:"1rem 0","max-width":"400px"}},g={style:{margin:"1rem 0","max-width":"400px"}},y={style:{margin:"1rem 0","max-width":"400px"}},c={style:{margin:"1rem 0","max-width":"400px"}},o={style:{margin:"1rem 0","max-width":"400px"}},F={style:{margin:"1rem 0","max-width":"400px"}},u={style:{margin:"1rem 0","max-width":"400px"}};function C(m,s,b,D,B,A){const t=e("capsule-calendar");return p(),h("div",null,[s[2]||(s[2]=a("",6)),i("div",d,[n(t)]),s[3]||(s[3]=a("",2)),i("div",E,[n(t,{value:"2024-03-15"})]),s[4]||(s[4]=a("",2)),i("div",r,[n(t,{"display-year":"2024","display-month":"5"})]),s[5]||(s[5]=a("",3)),i("div",g,[n(t,{"min-date":"2024-01-01","max-date":"2024-12-31"})]),s[6]||(s[6]=a("",3)),i("div",y,[n(t,{"disabled-dates":"2024-03-10,2024-03-15,2024-03-20"})]),s[7]||(s[7]=a("",3)),i("div",c,[n(t,{locale:"ru-RU"})]),s[8]||(s[8]=a("",1)),i("div",o,[n(t,{locale:"de-DE"})]),s[9]||(s[9]=a("",3)),i("div",F,[s[0]||(s[0]=i("div",{style:{display:"flex","justify-content":"space-between","align-items":"center","margin-bottom":"1rem"}},[i("button",{onclick:`
        const cal = document.querySelector('#calendar-nav-example');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        document.querySelector('#month-year-display').textContent = months[newMonth] + ' ' + newYear;
      `,style:{padding:"0.5rem 1rem",cursor:"pointer"}}," ← Prev "),i("span",{id:"month-year-display",style:{"font-weight":"600"}},"January 2024"),i("button",{onclick:`
        const cal = document.querySelector('#calendar-nav-example');
        const {year, month} = cal.getDisplayDate();
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) { newMonth = 0; newYear++; }
        cal.setDisplayDate(newYear, newMonth);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        document.querySelector('#month-year-display').textContent = months[newMonth] + ' ' + newYear;
      `,style:{padding:"0.5rem 1rem",cursor:"pointer"}}," Next → ")],-1)),n(t,{id:"calendar-nav-example"})]),s[10]||(s[10]=a("",3)),i("div",u,[s[1]||(s[1]=i("input",{type:"text",id:"date-input-example",style:{width:"100%",padding:"0.5rem","margin-bottom":"1rem","box-sizing":"border-box"},placeholder:"YYYY-MM-DD",pattern:"\\d{4}-\\d{2}-\\d{2}",onblur:`
      const dateValue = this.value.trim();
      const dateRegex = /^\\d{4}-\\d{2}-\\d{2}$/;
      if (dateValue && dateRegex.test(dateValue)) {
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          const cal = document.querySelector('#calendar-input-example');
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
            const cal = document.querySelector('#calendar-input-example');
            cal.setSelectedDate(dateValue);
            cal.setDisplayDate(date.getFullYear(), date.getMonth());
          }
        }
        this.blur();
      }
    `},null,-1)),n(t,{id:"calendar-input-example",oninput:"document.querySelector('#date-input-example').value = event.detail.value || ''"})]),s[11]||(s[11]=a("",30))])}const x=l(k,[["render",C]]);export{_ as __pageData,x as default};
