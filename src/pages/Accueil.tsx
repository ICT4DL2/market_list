import '../components/BigButton'
import { BigButton } from '../components/BigButton';
import {PlusCircle } from 'lucide-react';
import { ListFilterPlus } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
export function Accueil() {
    return (
      <div>
        <div className='section'>
          <h1>Bienvenue dans Market List 🛍️ !</h1>
        </div>
        
        <h2>Get Started with Rapid actions</h2>
        <div className='flex-container'>
          <BigButton label='Créer une nouvelle Liste' icon={PlusCircle} color='#ffa500'/>
          <BigButton label='Parcourir mes listes' icon={ListFilterPlus}/>
        </div>
        <h2>Browse your Recent Lists <ArrowRight/></h2>
      </div>
    );
  }
  