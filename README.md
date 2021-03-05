# Obsidian Activity History
![GitHub release)](https://img.shields.io/github/v/release/Darakah/obsidian-activity-history)
![GitHub all releases](https://img.shields.io/github/downloads/Darakah/obsidian-activity-history/total)

Github like activity block to track activity for whole vault or a specified project.

#### Example 1:
![example_1](https://raw.githubusercontent.com/Darakah/obsidian-activity-history/main/images/example_1.png) 

#### Example 2:
![example_2](https://raw.githubusercontent.com/Darakah/obsidian-activity-history/main/images/example_2.png) 

#### Example 3:
![example_3](https://raw.githubusercontent.com/Darakah/obsidian-activity-history/main/images/example_3.png) 

## Usage:

!!!!IMPORTANT!!!!
The plugin can show only activity from the date it is ACTIVATED as it tracks the change in size for the specified tracked projects. this means no info will be shown before that date.

Write the render block example shown below in edit mode in the note in which you want to add the render block.
![example_4](https://raw.githubusercontent.com/Darakah/obsidian-activity-history/main/images/example_4.png) 

It must contain a single line corresponding to the path of the project, for example:
- `/` for the whole vault
- `Project Example Test` for the project located at `/Project Example Test` 
- `Project Root/Project Second Example/Test Project` for the project located at `/Project Root/Project Second Example/Test Project`

thus to show board for the whole vault:
![example_5](https://raw.githubusercontent.com/Darakah/obsidian-activity-history/main/images/example_5.png) 


By default the plugin tracks `ONLY` the whole vault i.e. `/`. To add more projects, need to input the project name (same as above) in the settings menu of the plugin. If the project inputed is not a valid one it will not be added. It follows the same syntax as the one inputed in the render block. 

`**UPDATE SCHEDUAL:**` The plugin updates every 5 minutes the size of the different tracked projects.

## Settings:
![settings](https://raw.githubusercontent.com/Darakah/obsidian-activity-history/main/images/settings.png) 

# Customization
The activity board is highly customizable as shown in the examples shown above. All parameters can be modified in the settings menu `EXCEPT THE BACKGROUND COLOR`! The background color must be changed in the `style.css` file (found in the plugin folder), where you change `white` to whatever desired. 

```css
.selectYear {
    border-color: none;
}

.HistoryBoard {
    background-color: white;
    padding: 10px;
    border-radius: 14px;
    width: auto;
    height: auto;
}

.ObsidianHistoryBlock {
    background-color: white;
    border-radius: 14px;
    width: auto;
    height: auto;
}

.selectYear {
    float: right;
    margin-bottom: 5px;
    border-color: white;
    border-radius: 14px;
}
```

## Release Notes

### v0.1.4
- Added `monthly` option to the settings tab


## Support

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="BuyMeACoffee" width="100">](https://www.buymeacoffee.com/darakah)
