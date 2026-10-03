/**

 * CT Tax Calculator - Core Application Logic

 * Handles state management, calculations, and UI updates.

 */



const TaxApp = {
  
    state: {
      
        mode: 'single',
      
        singleTown: '',
      
        compareA: '',
      
        compareB: '',
      
        homeValue: 350000,
      
        exemptions: {
          
            senior: false,
          
            veteran: false
              
        }
          
    },
  

  
    init() {
      
        this.cacheDOM();
      
        this.bindEvents();
      
        this.loadState();
      
        this.render();
      
    },
  

  
    cacheDOM() {
      
        this.dom = {
          
            modeToggle: document.querySelector('.mode-toggle'),
          
            singleTownSelect: document.querySelector('#single-town'),
          
            homeValueInput: document.querySelector('#home-value'),
          
            seniorCheck: document.querySelector('#exempt-senior'),
          
            veteranCheck: document.querySelector('#exempt-veteran'),
          
            resultDisplay: document.querySelector('#annual-tax'),
          
            monthlyDisplay: document.querySelector('#monthly-tax'),
          
            rateDisplay: document.querySelector('#current-rate'),
          
            compareASelect: document.querySelector('#compare-a'),
          
            compareBSelect: document.querySelector('#compare-b'),
          
            compareResults: document.querySelector('#compare-results')
              
        };
      
    },
  

  
    bindEvents() {
      
        this.dom.singleTownSelect?.addEventListener('change', (e) => {
          
            this.state.singleTown = e.target.value;
          
            this.update();
          
        });
      

      
        this.dom.homeValueInput?.addEventListener('input', (e) => {
          
            this.state.homeValue = parseFloat(e.target.value) || 0;
          
            this.update();
          
        });
      

      
        this.dom.seniorCheck?.addEventListener('change', (e) => {
          
            this.state.exemptions.senior = e.target.checked;
          
            this.update();
          
        });
      

      
        this.dom.veteranCheck?.addEventListener('change', (e) => {
          
            this.state.exemptions.veteran = e.target.checked;
          
            this.update();
          
        });
      
    },
  

  
    loadState() {
      
        const saved = localStorage.getItem('ct_tax_state');
      
        if (saved) {
          
            this.state = { ...this.state, ...JSON.parse(saved) };
          
        }
      
    },
  

  
    saveState() {
      
        localStorage.setItem('ct_tax_state', JSON.stringify(this.state));
      
    },
  

  
    calculateTax(town, value) {
      
        if (!town || !value) return 0;
      
        const rate = townData[town] || 0;
      

      
        let adjustedValue = value;
      
        if (this.state.exemptions.senior) adjustedValue -= 10000; 
      
        if (this.state.exemptions.veteran) adjustedValue -= 5000;
      

      
        return (adjustedValue * rate) / 1000;
      
    },
  

  
    formatCurrency(val) {
      
        return new Intl.NumberFormat('en-US', {
          
            style: 'currency',
          
            currency: 'USD',
          
            maximumFractionDigits: 0
              
        }).format(val);
      
    },
  

  
    update() {
      
        this.saveState();
      
        const annual = this.calculateTax(this.state.singleTown, this.state.homeValue);
      

      
        if (this.dom.resultDisplay) this.dom.resultDisplay.textContent = this.formatCurrency(annual);
      
        if (this.dom.monthlyDisplay) this.dom.monthlyDisplay.textContent = this.formatCurrency(annual / 12);
      
        if (this.dom.rateDisplay) this.dom.rateDisplay.textContent = (townData[this.state.singleTown] || 0) + ' m';
      
    },
  

  
    render() {
      
        // Initial UI sync
      
        this.update();
      
    }
  
};



document.addEventListener('DOMContentLoaded', () => TaxApp.init());






































































































