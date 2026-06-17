\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{applemlr}
\LoadClassWithOptions{article}
\RequirePackage[top=2.25cm, bottom=2.5cm, left=2.5cm, right=2.5cm, columnsep=0.65cm]{geometry}
\RequirePackage{microtype}
\RequirePackage{placeins}
\RequirePackage{hyphenat}
\RequirePackage{setspace}
\RequirePackage{parskip}
\RequirePackage{babel}
\babelprovide[main, import, script=CJK, language=Chinese Simplified]{chinese}
\RequirePackage{lipsum}
\RequirePackage{etoolbox}
\RequirePackage{iftex}


\ifPDFTeX
  \DisableLigatures[f]{family=sf*}
\fi


\RequirePackage{graphicx}
\RequirePackage{subcaption}


\RequirePackage{booktabs}
\RequirePackage{nicematrix}
\RequirePackage{multirow}
\RequirePackage{bm}
\newcommand{\nm}[1]{#1}



\RequirePackage[most]{tcolorbox}
\RequirePackage{xcolor}
\definecolor{bscolor}{HTML}{007AFF}
\definecolor{fgcolor}{HTML}{333333}
\definecolor{bgcolor}{HTML}{EEEEEE}



\RequirePackage{hyperref}
\RequirePackage[noabbrev,nameinlink]{cleveref}
\hypersetup{
  colorlinks,
  linkcolor=bscolor,
  citecolor=bscolor,
  urlcolor=bscolor
}


\RequirePackage[square,numbers]{natbib}
\def\bibfont{\small}




\ifPDFTeX
  \RequirePackage[T1]{fontenc}
  \DeclareFontFamily{T1}{sfpro}{}
  \DeclareFontShape{T1}{sfpro}{m}{n}{<-> s * [0.88] store/sfpro}{}
  \DeclareFontShape{T1}{sfpro}{m}{it}{<-> s * [0.88] store/sfpro-italic}{}
  \DeclareFontShape{T1}{sfpro}{bx}{n}{<-> s * [0.88] store/sfpro-bold}{}

  \pdfmapline{+sfpro < store/SF-Pro.ttf <T1-WGL4.enc}
  \pdfmapline{+sfpro-italic < store/SF-Pro-Italic.ttf <T1-WGL4.enc}
  \pdfmapline{+sfpro-bold < store/SF-Pro-Display-Bold.ttf <T1-WGL4.enc}

  \renewcommand{\sfdefault}{sfpro}
  \RequirePackage{CJKutf8}
  \AtBeginDocument{\begin{CJK*}{UTF8}{gbsn}}
  \AtEndDocument{\end{CJK*}}
\else
  \ifXeTeX
    \RequirePackage{fontspec}
    \defaultfontfeatures{Ligatures=TeX, Scale=MatchLowercase}
    \microtypesetup{disable=true}
    \setsansfont{SF Pro}[Path=store/, UprightFont=SF-Pro.ttf, ItalicFont=SF-Pro-Italic.ttf, BoldFont=SF-Pro-Display-Bold.ttf, BoldItalicFont=SF-Pro-Italic.ttf]
    \setmainfont{SF Pro}[Path=store/, UprightFont=SF-Pro.ttf, ItalicFont=SF-Pro-Italic.ttf, BoldFont=SF-Pro-Display-Bold.ttf, BoldItalicFont=SF-Pro-Italic.ttf]
    \setmonofont{SF Pro}[Path=store/, UprightFont=SF-Pro.ttf]

    \RequirePackage{xeCJK}
    \xeCJKsetup{AutoFakeBold=true, AutoFakeSlant=true}
    \newcommand{\apple@setCJKfont}{%
      \setCJKmainfont{AR PL UMing CN}
      \setCJKsansfont{AR PL UMing CN}
      \IfFontExistsTF{Droid Sans Fallback}{%
        \setCJKmainfont{Droid Sans Fallback}
        \setCJKsansfont{Droid Sans Fallback}
      }{}
      \IfFontExistsTF{Source Han Sans SC}{%
        \setCJKmainfont{Source Han Sans SC}
        \setCJKsansfont{Source Han Sans SC}
      }{}
      \IfFontExistsTF{Noto Sans CJK SC}{%
        \setCJKmainfont{Noto Sans CJK SC}
        \setCJKsansfont{Noto Sans CJK SC}
      }{}
      \IfFontExistsTF{PingFang SC}{%
        \setCJKmainfont{PingFang SC}
        \setCJKsansfont{PingFang SC}
      }{}
    }
    \apple@setCJKfont
  \else
    \PackageError{applemlr}{This class currently supports pdfLaTeX or XeLaTeX only}{Switch to XeLaTeX to enable CJK typesetting.}
  \fi
\fi

\DeclareRobustCommand{\sbseries}{\fontseries{sb}\selectfont}
\DeclareTextFontCommand{\textsb}{\sbseries}

\renewcommand{\familydefault}{\sfdefault}


\RequirePackage{titlesec}

\titleformat*{\paragraph}{\sffamily\bfseries}
\titleformat*{\section}{\Large\sffamily\bfseries}
\titleformat*{\subsection}{\large\sffamily\bfseries}
\titleformat*{\subsubsection}{\normalsize\sffamily\bfseries}
\DeclareTextFontCommand{\sftextbf}{\bfseries\sffamily}




\RequirePackage{caption}
\DeclareCaptionLabelSeparator{custom}{}
\DeclareCaptionFormat{custom}{{\sffamily\sftextbf{#1 #2}} #3}
\captionsetup{singlelinecheck=false,format=custom,labelsep=custom,font=small}
\captionsetup[sub]{singlelinecheck=true,format=custom,labelsep=custom,font=small}

\renewcommand\addtolist[5][]{
  \begingroup
    \if\relax#3\relax\def\sep{}\else\def\sep{#5}\fi
    \let\protect\@unexpandable@protect 
    \xdef#3{\expandafter{#3}\sep #4[#1]{#2}}%
  \endgroup
}

\newcommand\authorlist{}
\newcommand\authorformat[2][]{{\sffamily \bfseries #2$^{#1}$}}
\renewcommand\author[2][]{\addtolist[#1]{#2}{\authorlist}{\authorformat}{\sffamily, }}



\newcommand\affiliationlist{}
\newcommand\affiliationformat[2][]{{\normalsize \sffamily $^{#1}$#2}}
\newcommand\affiliation[2][]{\addtolist[#1]{#2}{\affiliationlist}{\affiliationformat}{\sffamily, }}

\newcommand\contributionlist{}
\newcommand\contributionformat[2][]{{\footnotesize $^{#1}$#2}}
\newcommand\contribution[2][]{\addtolist[#1]{#2}{\contributionlist}{\contributionformat}{\sffamily, }}

\newcommand\metadatalist{}
\newcommand\metadataformat[2][]{{\small {\sffamily \bfseries #1:} #2}}
\newcommand\metadata[2][]{\addtolist[#1]{#2}{\metadatalist}{\metadataformat}{\par}}

\renewcommand{\abstract}[1]{\def\abstractlist{{\sffamily \color{fgcolor} #1}}}
\newcommand{\email}[1]{\href{mailto:#1}{\texttt{#1}}}

\renewcommand\date[1]{\metadata[Date]{#1}}
\newcommand\correspondence[1]{\metadata[Correspondence]{#1}}

\renewcommand{\title}[1]{\newcommand{\titlelist}{{\Huge\sffamily\bfseries #1}}}

\newcommand{\beginappendix}{\appendix{\huge\sffamily Appendix\par}}



\newcommand{\mymaketitle}{%
  \tcbset{enhanced,frame hidden}
  \tcbset{left=0.5cm}
  \tcbset{right=0.5cm}
  \tcbset{top=0.5cm}
  \tcbset{bottom=0.5cm}
  \tcbset{arc=16pt}
  \tcbset{before skip=0pt}
  \tcbset{grow to left by=1.5pt}
  \tcbset{grow to right by=1.5pt}
  \tcbset{overlay={\node[
    anchor=north east,
    at= (frame.north east),
    xshift= -0.5cm,
    yshift= -0.5cm] {\includegraphics[height=11mm]{store/sjtu.png}};}}
  
  \begin{tcolorbox}
    \setlength{\parindent}{0cm}
    \setlength{\parskip}{0.5cm}
    {
      \setlength{\parskip}{0cm}
      \raggedright
      \nohyphens
      %
      {
        % \vskip 1.5cm
        \titlelist\par
      }
      \vskip 0.2cm
      %
      \authorlist\par
      \vskip 0.2cm
      %
      \affiliationlist\par
      %
      \contributionlist\par
    }
    %
    \abstractlist\par
    %
    \vskip 0.5cm
    %
    {
      \setlength{\parskip}{0cm}
      \ifdefempty{\metadatalist}{\vspace*{0.65cm}}{\metadatalist\par}
    }

  \end{tcolorbox}
  \tcbset{reset}
  \FloatBarrier
}

\if@twocolumn%
\renewcommand{\maketitle}{
\twocolumn[%
  \mymaketitle
  \vskip 0.38cm
]
}%
\else%
\renewcommand{\maketitle}{
  \mymaketitle
}%
\fi
