export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Session {
  id: number;
  title: string;
  videoUrl: string;
  completed: boolean;
}

export interface Level {
  id: number;
  title: string;
  sessions: Session[];
  quiz: QuizQuestion[];
  completed: boolean;
  passed: boolean;
}

export interface Course {
  id: string;
  title: string;
  levels: Level[];
}

export const ESPENCourse: Course = {
  id: 'espen-camp',
  title: 'ESPEN Camp',
  levels: [
    {
      id: 1,
      title: 'Level 1',
      completed: false,
      passed: false,
      sessions: [
        {
          id: 1,
          title: 'Session 1',
          videoUrl: 'https://www.youtube.com/watch?v=R_iqe24R-LI&list=PL2VHCq4k3FvHuM-hjmVuhGbO6CGaZeT_P&index=1&t=1s&pp=iAQB',
          completed: false
        },
        {
          id: 2,
          title: 'Session 2',
          videoUrl: 'https://www.youtube.com/watch?v=uVn_OomS_FA&list=PL2VHCq4k3FvHuM-hjmVuhGbO6CGaZeT_P&index=2&pp=iAQB',
          completed: false
        },
        {
          id: 3,
          title: 'Session 3',
          videoUrl: 'https://www.youtube.com/watch?v=uvZK2oGP8fI&list=PL2VHCq4k3FvHuM-hjmVuhGbO6CGaZeT_P&index=3&pp=iAQB',
          completed: false
        },
        {
          id: 4,
          title: 'Session 4',
          videoUrl: 'https://www.youtube.com/watch?v=gqDJ1ZwkI_c&list=PL2VHCq4k3FvHuM-hjmVuhGbO6CGaZeT_P&index=4&pp=iAQB',
          completed: false
        },
        {
          id: 5,
          title: 'Session 5',
          videoUrl: 'https://www.youtube.com/watch?v=K3MM35F34fA&list=PL2VHCq4k3FvHuM-hjmVuhGbO6CGaZeT_P&index=5&pp=iAQB',
          completed: false
        },
        {
          id: 6,
          title: 'Final Session',
          videoUrl: 'https://www.youtube.com/watch?v=YVyIzvYTJto&list=PL2VHCq4k3FvHuM-hjmVuhGbO6CGaZeT_P&index=6&pp=iAQB',
          completed: false
        }
      ],
      quiz: [
        {
          question: 'Essential fatty acids are all except one:',
          options: ['α Linolenic acid', 'Oleic', 'Linoleic', 'Arachidonic'],
          correctAnswer: 'Oleic'
        },
        {
          question: 'Hepatic TAGs are synthesized from',
          options: [
            'FAs, glucose and other lipids',
            'From chylomicron remnants only',
            'From dietary FA only',
            'Hepatic TAGs immediately degraded after synthesis'
          ],
          correctAnswer: 'FAs, glucose and other lipids'
        },
        {
          question: 'Non-adipose cells metabolize FFAs as following:',
          options: [
            'Utilize FFAs locally for energy production',
            'Synthesize TAG and secrete FFAs into the blood on energy demand as systemic energy substrate',
            'Do not utilise FFA for lipid synthesis',
            'Produce TAG and excrete them as complexes with albumin'
          ],
          correctAnswer: 'Utilize FFAs locally for energy production'
        },
        {
          question: 'Free fatty acids (FFAs) are taken for oxidation by many tissues,',
          options: [
            'quantitatively major site is skeletal muscle',
            'quantitatively major site is liver',
            'quantitatively major site is brain',
            'quantitatively major site is intestine'
          ],
          correctAnswer: 'quantitatively major site is skeletal muscle'
        },
        {
          question: 'LDL particles',
          options: [
            'Their number can be decreased by improving the number of LDL receptors in the liver',
            'They are mainly synthesized in adipose tissue',
            'They contain only TAGs (triacylglycerols)',
            'They are made from HDL'
          ],
          correctAnswer: 'Their number can be decreased by improving the number of LDL receptors in the liver'
        }
      ]
    }
  ]
}; 