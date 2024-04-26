import '../../scss/pages/feedback.scss';

document.addEventListener('DOMContentLoaded', () => {
    customSelectFields();
    selectFieldsInteraction();
});

// Custom select fields interaction
const selectFieldsInteraction = () => {
    let selectedOption = null;

    const toggleSelect = (element) => {
        const selectBox = element.closest('.select-box-custom');
        selectBox.classList.toggle('active');

        document.querySelectorAll('.select-box-custom').forEach(el => {
            if (el !== selectBox) {
                el.classList.remove('active');
            }
        });
    };

    const selectOption = (option, selectBox) => {
        const selected = selectBox.querySelector('.select-box-custom-selected');
        selected.textContent = option.textContent;
        if (selectedOption !== null) {
            selectedOption.classList.remove('active');
        }
        selectedOption = option;
        option.classList.add('active');
        // Update <select> value (assuming <select> is next to .select-box-custom)
        selectBox.nextElementSibling.value = option.textContent;
        selectBox.classList.remove('active');
    };

    document.addEventListener('click', function (e) {
        if (e.target.matches('.select-box-custom-selected[data-toggle="select-box"]')) {
            toggleSelect(e.target);
        } else if (e.target.matches('.select-box-custom-option')) {
            selectOption(e.target, e.target.closest('.select-box-custom'));
        } else if (!e.target.closest('.select-box-custom')) {
            document.querySelectorAll('.select-box-custom').forEach(el => el.classList.remove('active'));
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 9) { // Tab key
            document.querySelectorAll('.select-box-custom').forEach(el => el.classList.remove('active'));
        }
    });
};

// Custom select fields
const customSelectFields = () => {
    const fields = document.querySelectorAll('select');

    fields.forEach(field => {
        let placeholder = field.getAttribute('data-placeholder') || field.querySelector('option').textContent;

        const selectBoxCustom = document.createElement('div');
        selectBoxCustom.className = 'select-box-custom';

        const selectBoxCustomSelected = document.createElement('div');
        selectBoxCustomSelected.className = 'select-box-custom-selected';
        selectBoxCustomSelected.setAttribute('data-toggle', 'select-box');
        selectBoxCustomSelected.textContent = placeholder;

        const selectBoxCustomDropdown = document.createElement('ul');
        selectBoxCustomDropdown.className = 'select-box-custom-dropdown';

        selectBoxCustom.append(selectBoxCustomSelected, selectBoxCustomDropdown);
        field.parentNode.insertBefore(selectBoxCustom, field);

        Array.from(field.options).forEach(option => {
            const listItem = document.createElement('li');
            listItem.className = 'select-box-custom-option';
            listItem.textContent = option.textContent;
            selectBoxCustomDropdown.appendChild(listItem);
        });
    });
};
