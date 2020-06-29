import {
    addons
} from '@storybook/addons'
import {
    themes
} from '@storybook/theming'
import {
    create
} from '@storybook/theming/create'

const theme = create({
    base: 'dark',
    brandTitle: 'Saddles Studio',
    brandUrl: 'SaddlesIndia.Studio'
})

addons.setConfig({
    showPanel: false,
    theme: theme
})