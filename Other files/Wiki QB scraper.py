import requests
from bs4 import BeautifulSoup as BS
import pandas as pd

xl_df = pd.read_excel(
    r"C:\Dev\TheQBCarousel\Other files\Tables.xlsx",
    sheet_name="Teams"
)

qb_list = []

team_name = "Baltimore Ravens"
season = "2021"

for i in xl_df.index:
    if xl_df.loc[i,'Location'] == "Washington":
        team_name = "Washington Football Team"
    else:
        team_name = xl_df.loc[i,'Location'] + " " + xl_df.loc[i,'Nickname']
    season = 2021

    team_name_url = team_name.replace(" ","_")
    # url = "https://en.wikipedia.org/wiki/2021_Baltimore_Ravens_season#Final_roster"
    url = f"https://en.wikipedia.org/wiki/{season}_{team_name_url}_season#Final_roster"
    
    r = requests.get(url)
    soup = BS(r.text,'lxml')
    
    
    def get_final_roster_table(soup,team_name,season):
        if team_name in ['Cincinnati Bengals','Los Angeles Rams']:
            text2look4 = f"{team_name} roster"
        else:
            text2look4 = f"{season} {team_name} final roster"
        for table in soup.find_all('table'):
            if table.find(text=text2look4):
                return table
            
    def get_players_by_position(table):
        rm = {}
        title_tags = table.find_all('b')[1:]
        ul_tags = table.find_all('ul')
        for title,ul in zip(title_tags,ul_tags):
            player_names = []
            for x in ul.find_all('a'):
                if 'title' in x.attrs:
                    pn = x['title']
                    if "(" in pn:
                        bracket_ix = pn.index("(")
                        pn = pn[:bracket_ix-1]
                    player_names.append(pn)
            rm[title.text] = player_names
        return rm
    
    table = get_final_roster_table(soup,team_name,season)
    D = get_players_by_position(table)
    qb_list.extend(D['Quarterbacks'])
    
df = pd.DataFrame({'a':qb_list})