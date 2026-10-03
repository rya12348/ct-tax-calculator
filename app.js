import TOWN_DATA from './data.js';



function taxCalculator() {
  
    return {
      
        mode: 'single',
      
        singleTown: localStorage.getItem('lastTown') || '',
      
        compareA: '',
      
        compareB: '',
      
        homeValue: parseFloat(localStorage.getItem('lastValue')) || 350000,
      
        exemptions: { senior: false, veteran: false },
      

      
        init() {
          
            this.$watch('singleTown', val => localStorage.setItem('lastTown', val));
          
            this.$watch('homeValue', val => localStorage.setItem('lastValue', val));
          
        },
      

      
        get townList() {
          
            return Object.keys(TOWN_DATA).sort();
          
        },
      

      
        getRate(town) {
          
            return TOWN_DATA[town]?.rate || 0;
          
        },
      

      
        calculateTax(town, value) {
          
            if (!town || !value) return 0;
          
            const rate = this.getRate(town);
          

          
            let adjustedValue = value;
          
            if (this.exemptions.senior) adjustedValue -= 10000; 
          
            if (this.exemptions.veteran) adjustedValue -= 5000;
          

          
            return (adjustedValue * rate) / 1000;
          
        },
      

      
        formatCurrency(val) {
          
            return new Intl.NumberFormat('en-US', {
              
                style: 'currency',
              
                currency: 'USD',
              
                maximumFractionDigits: 0
                  
            }).format(val);
          
        }
      
    }
  
}



window.taxCalculator = taxCalculator;








































