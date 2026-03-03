import type { Company } from '../App';

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'GreenTech Solutions',
    description: 'Líder em tecnologia sustentável com foco em energia renovável e redução de emissões. Comprometida com práticas éticas e transparentes.',
    logo: '',
    esgScore: 87,
    environmental: 92,
    social: 85,
    governance: 84,
    category: 'Tecnologia',
    criteria: {
      emissions: 'Redução de 45% nas emissões nos últimos 3 anos',
      renewable: '80% da energia de fontes renováveis',
      diversity: '52% de representação de grupos minoritários',
      labor: 'Certificação internacional de práticas trabalhistas',
      transparency: 'Relatórios ESG auditados trimestralmente'
    }
  },
  {
    id: 2,
    name: 'EcoFashion Co.',
    description: 'Moda sustentável com cadeia de produção transparente e materiais orgânicos certificados.',
    logo: '',
    esgScore: 78,
    environmental: 88,
    social: 75,
    governance: 71,
    category: 'Moda',
    criteria: {
      emissions: 'Carbono neutro desde 2022',
      renewable: '95% materiais orgânicos ou reciclados',
      diversity: '48% de liderança feminina',
      labor: 'Salários justos em toda cadeia produtiva',
      transparency: 'Rastreabilidade completa dos produtos'
    }
  },
  {
    id: 3,
    name: 'BioPharma Health',
    description: 'Empresa farmacêutica focada em medicamentos acessíveis e pesquisa responsável.',
    logo: '',
    esgScore: 72,
    environmental: 68,
    social: 82,
    governance: 75,
    category: 'Saúde',
    alerts: [
      'Investigação em andamento sobre práticas de precificação em 2023',
      'Multa ambiental por descarte inadequado (resolvida em 2024)'
    ],
    criteria: {
      emissions: 'Redução de 30% nas emissões',
      renewable: '50% energia renovável nas fábricas',
      diversity: 'Programas de inclusão premiados',
      labor: 'Ambiente de trabalho certificado',
      transparency: 'Publicação anual de dados ESG'
    }
  },
  {
    id: 4,
    name: 'CleanEnergy Corp',
    description: 'Fornecedora de soluções de energia limpa para residências e empresas.',
    logo: '',
    esgScore: 91,
    environmental: 95,
    social: 88,
    governance: 89,
    category: 'Energia',
    criteria: {
      emissions: '100% energia limpa',
      renewable: 'Líder em inovação solar e eólica',
      diversity: '60% de diversidade na equipe',
      labor: 'Benefícios acima da média do setor',
      transparency: 'Auditoria ESG independente anual'
    }
  },
  {
    id: 5,
    name: 'FairTrade Foods',
    description: 'Alimentos orgânicos com comércio justo e apoio a pequenos produtores.',
    logo: '',
    esgScore: 83,
    environmental: 86,
    social: 90,
    governance: 76,
    category: 'Alimentação',
    criteria: {
      emissions: 'Logística com baixo carbono',
      renewable: 'Agricultura regenerativa',
      diversity: 'Suporte a comunidades locais',
      labor: 'Preços justos para produtores',
      transparency: 'Certificações orgânicas e fair trade'
    }
  },
  {
    id: 6,
    name: 'SocialBank',
    description: 'Banco digital focado em investimentos sustentáveis e inclusão financeira.',
    logo: '',
    esgScore: 80,
    environmental: 75,
    social: 85,
    governance: 82,
    category: 'Finanças',
    criteria: {
      emissions: 'Operações 100% digitais',
      renewable: 'Investimentos verdes prioritários',
      diversity: 'Crédito para empreendedores de baixa renda',
      labor: 'Equipe diversa e inclusiva',
      transparency: 'Relatórios financeiros públicos'
    }
  }
];
