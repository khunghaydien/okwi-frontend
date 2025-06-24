export const scrollToFirstElement = (element: string) => {
    const firstElement = document.querySelector(
        `.${element}`
    ) as HTMLElement
    if (firstElement) {
        firstElement.scrollIntoView({
            behavior: 'smooth',
        })
    }
}

export const scrollToLastElement = (element: string) => {
    const lastElement = document.querySelectorAll(
        `.${element}`
    ) as NodeListOf<HTMLElement>
    if (lastElement.length > 0) {
        const lastErrorMessage = lastElement[lastElement.length - 1]
        lastErrorMessage.scrollIntoView({
            behavior: 'smooth',
        })
    }
}

export const scrollToElementById = (id: string) => {
    const element = document.querySelector(`#${id}`) as HTMLElement;
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
        });
    }
};